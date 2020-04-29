import React from 'react';
import Dropdown from "../DropDown";
import {useForm} from "react-hook-form";
import {createUserFormDataType} from "../../../interfaces/Views/users";
import {dateRanges} from '../../../constants/dropdown/dateRanges'
const ChartDropDown = () => {
    const {control} = useForm<createUserFormDataType>({});
    return (
        <div className="chart-dropdown-container">
           <Dropdown id='1' name='ChartDropDown' label='Select date range' control={control} data={dateRanges} size='small' ignoreNone={true}/>
        </div>
    );
};

export default ChartDropDown;