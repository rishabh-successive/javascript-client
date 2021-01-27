import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table } from '../../components';
import trainee from './data/trainee';
import callApi from '../../lib/utils/api';
import { limit }  from '../../config/constants';
import { getDateFormatted } from '../../lib/utils/getDateFormatted';
import { AddDialogue, EditDialog, RemoveDialog } from './components';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: props.order,
      orderBy: props.orderBy,
      deleteOpen: false,
      editOpen: false,
      traineeData: {},
      records: [],
      totalRecords: 0,
      page: 0,
      loader: false,
      limit,
    };
    // this.handleEventDialogOpen=this.handleEventDialogOpen.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData =  () => {
    const header = localStorage.getItem('token');
    const { page: statePage } = this.state;
    const params = {
      skip: statePage * limit,
      limit,
    };
    this.setState({ loader: true });
    callApi('/user/getall', 'GET', {}, header, params)
      .then((data) => {
        console.log('response', data);
        this.setState({
          records: data.Trainees.data.records,
          totalRecords: data.Trainees.data.count,
        }, () => {
          const { records } = this.state;
          if (records.length === 0 && statePage) {
            this.setState({ page: statePage - 1 }, () => this.getData());
          }
        });
      })
      .catch((err) => {
        // if (err.response.data.code === 401) {
        localStorage.removeItem('token');
        // }
      });
    this.setState({ loader: false });
  };

  handleAllEvents = (condition) => {
    this.setState({ open: condition });
  };
  // handleDeleteClose = () => {
  //   this.setState({ deleteOpen: false });
  // }

  // handleEditClose = () => {
  //   this.setState({ editOpen: false });
  // }

  handleDialogEvents = (condition) => {
    this.setState((prevState) => ({
      ...prevState, [condition]: false, }));
  }


  handleEventDialogOpen = (data, condition) => (event) => {
    event.preventDefault;
    this.setState((prevState) => ({
      ...prevState, [condition]: true, traineeData: data
    }));
  }

  // handleEditDialogOpen = (event, data) => {
  //   event.preventDefault();
  //   this.setState({ editOpen: true, traineeData: data });
  // }

  // handleRemoveDialogOpen = (event, data) => {
  //   event.preventDefault();
  //   this.setState({ deleteOpen: true, traineeData: data });
  // };

  handleChangePage = (event, page) => {
    this.setState({ page });
  }
  handleChangeLimit = (event) => {
    this.setState({ limit: event.target.value });
  }

  handleSubmit = (temp) => {
    this.setState({ open: false }, () => this.getData());
  }

  handleDeleteSubmit = () => {
    this.setState({ deleteOpen: false }, () => {
      this.getData();
    });
  }
  handleEditSubmit = () => {
    this.setState({ editOpen: false });
    this.getData();
  }

  renderTrainee = (item, index) => {
    const { match } = this.props;
    const { page } = this.state;
    const skip = page * limit;
    return (
      <li key={index}>
        <Link to={{ pathname: `${match.path}/${item.id}`, state: { skip, limit } }}>
          {item.name}
        </Link>
      </li>
    );
  }

  renderTrainees = () => {
    const { records } = this.state;
    return (
      <ul>
        {
          records.map((item, index) => this.renderTrainee(item, index))
        }
      </ul>
    );
  }

  handleSort = (field) => {
    const { order, orderBy } = this.state;
    if (orderBy !== field) {
      this.setState({
        order: 'asc',
        orderBy: field,
      });
    } else {
      this.setState({
        order: (order) === 'asc' ? 'desc' : 'asc',
        orderBy: field,
      });
    }
  }

  handleChangePage = (event, page) => {
    event.preventDefault();
    this.setState({ page }, () => this.getData());
  }

  handleSelect = (event, id) => {
    const { history, match } = this.props;
    const { page } = this.state;
    const skip = page * limit;
    event.preventDefault();
    history.push(`${match.path}/${id}`, { skip, limit });
  }


  render() {
    const {
      open,
      order,
      orderBy,
      traineeData, page, deleteOpen, editOpen, records, totalRecords, loader,
    } = this.state;

    return (
      <>
        <br />
        <div style={{ marginRight: '2%' }} align="right">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.handleAllEvents(true)}
          >
            ADD TRAINEELIST
          </Button>
        </div>
        <Table
          id="id"
          data={records}
          columns={
            [
              {
                field: 'name',
                label: 'Name',
              },
              {
                field: 'email',
                label: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: getDateFormatted,
              },
            ]
          }
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEventDialogOpen(traineeData,'editOpen'),
            },
            {
              icon: <DeleteIcon />,
              handler:  this.handleEventDialogOpen(traineeData,'deleteOpen'),
            },
          ]}
          order={order}
          orderBy={orderBy}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={totalRecords}
          rowsPerPage={limit}
          page={page}
          onChangePage={this.handleChangePage}
          loader={loader}
          dataLength={totalRecords}
        />
        {this.renderTrainees()}
        <AddDialogue
          open={open}
          onClose={() => this.handleAllEvents(false)}
          onSubmit={this.handleSubmit}
        />
        <RemoveDialog
          deleteOpen={deleteOpen}
          onClose={()=> this.handleDialogEvents('deleteOpen')}
          details={traineeData}
        />
        <EditDialog
          editOpen={editOpen}
          onClose={() => this.handleDialogEvents('editOpen')}
          onSubmit={this.handleEditSubmit}
          details={traineeData}
        />
      </>
    );
  }
}
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};
TraineeList.defaultProps = {
  orderBy: '',
  order: 'asc',
};
export default TraineeList;