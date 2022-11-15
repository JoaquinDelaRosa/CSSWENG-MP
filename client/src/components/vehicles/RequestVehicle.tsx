import { useForm } from "react-hook-form";
import { isAlphabetic, isAlphaNumeric, isLicensePlate } from "../../utils/Regex";
import { VehicleRequest } from "./VehicleDetails";

export const RequestVehicle = (props : {setResponse : Function, default? : VehicleRequest}) => {
    
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(100),( val, index) => year - index);
    const {register, handleSubmit, formState: {errors}} = useForm<VehicleRequest>()

    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <div>
            <p className="modalHeader">Editing Vehicle Table:</p>
            <br />
            <form className="formStyle" onSubmit={onSubmit}>
                <div className="licensePlateTag">
                    <label htmlFor='licensePlate' className="vehicleSubText">License Plate</label>
                    <input {... register('licensePlate', {required: true, pattern: isLicensePlate})}
                    type="text" name="licensePlate" defaultValue={props.default?.licensePlate} className="vehicleSubField"/>
                    {errors.licensePlate && <p>License Plate is Required</p>}
                </div>
                <div className="manufactTag">
                    <label htmlFor='manufacturer' className="vehicleSubText">Manufacturer</label>
                    <input {... register('manufacturer', {required: true, pattern: isAlphabetic})}
                    type="text" name="manufacturer" defaultValue={props.default?.manufacturer} className="vehicleSubField"/>
                    {errors.manufacturer && <p>Manufacturer is Required</p>}
                </div>
                <div className="modelTag">
                    <label htmlFor='model' className="vehicleSubText">Model</label>
                    <input {... register('model', {required: true, pattern: isAlphaNumeric})}
                    type="text" name="model" defaultValue={props.default?.model} className="vehicleSubField"/>
                    {errors.model && <p>Model is Required</p>}
                </div>
                <div className="yearManufTag">
                    <label htmlFor='yearManufactured' className="vehicleSubText">Year Manufactured</label>
                    <select className="vehicleSubField" {...register('yearManufactured', {valueAsNumber: true, required: true})} 
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
                <input type="button" name="submit" className="submit" onClick={onSubmit} value={"SUBMIT"}/>
            </form>
        </div> 
    );
}