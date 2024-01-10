import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import CustomToast from '../../components/CustomToast';
import CustomBackTitle from '../../navigation/CustomBackTitle';
import { DataGrid } from '@mui/x-data-grid';
import { api } from '../../config/api';
import moment from 'moment';
import { Typography } from '@mui/material';

const TanodDeploymentList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        api.get('/tanoddeployment/getalltanoddeployments')
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "deploymentDate",
            headerName: "Deployment Date",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                console.log(cellValue)
                return moment(cellValue.row.date_time_deployment).format('LL | hh:mm A');
            },
        },
        {
            field: "tanodDeployed",
            headerName: "Tanod Deployed",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                // return `•${cellValue.row.tanod1.name} •${cellValue.row.tanod2.name}`;
                return (
                    <div>
                        <Typography variant='body2'>• {cellValue.row.tanod1.name}</Typography>
                        <Typography variant='body2'>• {cellValue.row.tanod2.name}</Typography>
                    </div>
                )
            },
        },
        {
            field: "description",
            headerName: "Description",
            width: 160,
            editable: true,
            renderCell: (cellValue) => {
                return `${cellValue.row.description}`;
            },
        },
        {
            field: "created_at",
            headerName: "Created At",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                return moment(cellValue.row.created_at).format('LL | hh:mm:ss');
            },
        },
    ];

    return (
        <div className='px-10 py-4'>
            <CustomToast />
            <CustomBackTitle title={`Tanod Deployment List`} url={'/home'} hasButton label={'Tanod Deployment Map'} onClick={() => location.href = 'tanoddeployment/map'} />
            <div className="my-5">
                <DataGrid 
                    rows={data}
                    columns={columns}
                    initialState={{ 
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            }
                        }
                     }}
                     pageSizeOptions={[5]}
                     disableRowSelectionOnClick
                     autoHeight
                />
            </div>
        </div>
    );
}

export default TanodDeploymentList;

if (document.getElementById('TanodDeploymentList')) {
    ReactDOM.render(<TanodDeploymentList />, document.getElementById('TanodDeploymentList'))
}