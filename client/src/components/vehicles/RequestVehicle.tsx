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
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='licensePlate'>License Plate</label>
                    <input {... register('licensePlate', {required: true, pattern: isLicensePlate})}
                    type="text" name="licensePlate" defaultValue={props.default?.licensePlate}/>
                    {errors.licensePlate && <p>License Plate is Required</p>}
                </div>
                <div>
                    <label htmlFor='manufacturer'>Manufacturer</label>
                    <input {... register('manufacturer', {required: true, pattern: isAlphabetic})}
                    type="text" name="manufacturer" defaultValue={props.default?.manufacturer}/>
                    {errors.manufacturer && <p>Manufacturer is Required</p>}
                </div>
                <div>
                    <label htmlFor='model'>Model</label>
                    <input {... register('model', {required: true, pattern: isAlphaNumeric})}
                    type="text" name="model" defaultValue={props.default?.model}/>
                    {errors.model && <p>Model is Required</p>}
                </div>
                <div>
                    <label htmlFor='yearManufactured'>Year Manufactured</label>
                    <select  {...register('yearManufactured', {valueAsNumber: true, required: true})} 
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
                <input type="button" name="submit" onClick={onSubmit} value={"Submit"}/>
            </form>
        </div> 
    );
}