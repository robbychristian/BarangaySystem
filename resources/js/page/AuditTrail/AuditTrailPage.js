import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import CustomToast from '../../components/CustomToast'
import CustomBackTitle from '../../navigation/CustomBackTitle'
import { DataGrid } from '@mui/x-data-grid'
import { api } from '../../config/api'
import moment from 'moment'

const AuditTrailPage = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        api.get('audit/getallaudit')
            .then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "name",
            headerName: "User",
            width: 150,
            editable: true,
            renderCell: (cellValue) => {
                return cellValue.value.name;
            },
        },
        {
            field: "event",
            headerName: "Action",
            width: 160,
            editable: true,
            renderCell: (cellValue) => {
                return cellValue.value.event;
            },
        },
        {
            field: "auditable_type",
            headerName: "Table",
            width: 160,
            editable: true,
            renderCell: (cellValue) => {
                return String(cellValue.row.auditable_type).replace('App\\Models\\', '') + " Table";
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
            <CustomBackTitle title={`Audit Trail`} url={'/home'} />
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
                />
            </div>
        </div>
    )   
}

export default AuditTrailPage

if (document.getElementById('AuditTrailPage')) {
    ReactDOM.render(<AuditTrailPage />, document.getElementById('AuditTrailPage'))
}