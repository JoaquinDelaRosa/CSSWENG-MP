import { useForm } from "react-hook-form";
import { isAlphabetic, isAlphaNumeric, isLicensePlate } from "../../utils/Regex";
import { Vehicle, VehicleRequest } from "./VehicleDetails";

export const RequestVehicle = (props : {setResponse : Function, default? : VehicleRequest, isInForm? : boolean}) => {
    
    const {register, handleSubmit, formState: {errors}} = useForm<VehicleRequest>()
    const isInForm = (props.isInForm) ? props.isInForm : true;

    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <div>
            <p className="modalHeader">Editing Vehicle Table</p>
            {
                !isInForm && 
                <form className="formStyle" onSubmit={onSubmit} autoComplete="off">
                    <RequestVehicleForm errors={errors} register={register} default={props.default}/>
                    <div className="submitButton">
                        <input type='button' name="submit" className="submit" onClick={onSubmit}value={"SUBMIT"} />
                    </div>
                </form>
            }
            <br />
            {
                isInForm && 
                <div className="formStyle" onSubmit={onSubmit}>
                    <RequestVehicleForm errors={errors} register={register} default={props.default}/>
                    <input type='button' name="submit" className="submit" onClick={onSubmit}value={"SUBMIT"} />
                </div>
            }
        </div> 
    );
}

const RequestVehicleForm = (props : {register : Function, errors : any, default? : VehicleRequest}) => {
    
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(100),( val, index) => year - index);

    const register = props.register;
    const errors = props.errors;
    return (
        <>
            <div className="licensePlateTag">
                <label htmlFor='licensePlate' className="vehicleSubText">License Plate</label>
                <input className="vehicleSubField"
                {... register('licensePlate', {required: true, pattern: isLicensePlate})}
                type="text" name="licensePlate" defaultValue={props.default?.licensePlate}/>
                {errors.licensePlate && <p>License Plate is Required</p>}
            </div>
            <div className="manufactTag">
                <label htmlFor='manufacturer' className="vehicleSubText" >Manufacturer</label>
                <input className="vehicleSubField"
                {... register('manufacturer', {required: true, pattern: isAlphabetic})}
                type="text" name="manufacturer" defaultValue={props.default?.manufacturer}/>
                {errors.manufacturer && <p>Manufacturer is Required</p>}
            </div>
            <div className="modelTag">
                <label htmlFor='model' className="vehicleSubText" >Model</label>
                <input className="vehicleSubField"
                {... register('model', {required: true, pattern: isAlphaNumeric})}
                type="text" name="model" defaultValue={props.default?.model}/>
                {errors.model && <p>Model is Required</p>}
            </div>
            <div className="yearManufTag">
                <label htmlFor='yearManufactured' className="vehicleSubText">Year Manufactured</label>
                <select  className="vehicleSubField"
                {...register('yearManufactured', {valueAsNumber: true, required: true})} 
                    defaultValue= {(props.default && props.default.yearManufactured) ? 
                        props.default.yearManufactured.valueOf(): "DEFAULT"}>
                    <option key={0} value="DEFAULT" disabled>  -- Select Year -- </option>
                    {
                        years.map((year, index) => {
                            return (
                                <option key={index + 1} value={year}> {year} </option>
                            )
                        })
                    }
                </select>
                {errors.yearManufactured && <p>Year Manufactured is Required</p>}
            </div>
            <br />
            <br />
        </>
    )
}