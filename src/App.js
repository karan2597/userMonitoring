import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import BootStrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import constants from './utils/constants';
import apiMethod from './utils/api';
import { getActivityTimeline, getFormattedDate } from './utils/moment';
import './App.css';

const {
  mockAPI, defaultDateFormat, defaultText, columns,
} = constants;

function App() {
  const [membersInfo, setMembersInfo] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [date, setDateVal] = useState(new Date().toISOString());

  const paginationOptions = {
    sizePerPageList: [{
      text: '3', value: 3,
    }, {
      text: '6', value: 6,
    },
    {
      text: 'All', value: membersInfo.length,
    }],
    paginationSize: 2,
  };

  const toggle = () => setModal(!modal);

  const fetchUserMonitoringInfo = async () => {
    const response = await apiMethod({
      url: mockAPI,
      method: 'GET',
    });
    const { data: { members } } = response;
    setMembersInfo(members);
  };

  useEffect(() => {
    fetchUserMonitoringInfo();
  }, []);

  const computeActivityInfo = () => {
    const dateComponent = getFormattedDate({ date, format: defaultDateFormat });
    const activityEntries = [];
    // computing whether or not user activity exists for the given period
    // eslint-disable-next-line array-callback-return
    modalInfo.activity_periods.map((activityInfo) => {
      const { startTime, endTime } = activityInfo;
      const startDate = getActivityTimeline({ timestamp: startTime, format: defaultDateFormat });
      if (dateComponent === startDate) {
        const startTimeInterval = getActivityTimeline({ timestamp: startTime, format: 'h:mm A' });
        const endTimeInterval = getActivityTimeline({ timestamp: endTime, format: 'h:mm A' });
        // stroing the all user activities for a particular date
        activityEntries.push(`${startTimeInterval} - ${endTimeInterval}`);
      }
    });
    if (activityEntries.length > 0) {
      // prinitng user activites for selected date
      return activityEntries.map((slots) => <li>{slots}</li>);
    }
    return defaultText;
  };

  const handleChange = (v) => {
    setDateVal(v);
  };

  const ModalContent = () => (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{modalInfo.name}</ModalHeader>
      <ModalBody>
        <DatePicker
          value={date}
          onChange={(v) => handleChange(v)}
        />
        <Card>
          <CardBody>
            <CardTitle className="cardTitle">Activity Info:</CardTitle>
            <CardText>{computeActivityInfo()}</CardText>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );

  const rowEvents = {
    onClick: (e, row) => {
      setModalInfo(row);
      setModal(true);
    },
  };

  return (
    <>
      <div className="outerWrap">
        <BootStrapTable
          keyField="id"
          data={membersInfo}
          hover
          striped
          columns={columns}
          rowEvents={rowEvents}
          pagination={paginationFactory(paginationOptions)}
        />
      </div>
      {modal ? <ModalContent /> : null}
    </>
  );
}

export default App;
