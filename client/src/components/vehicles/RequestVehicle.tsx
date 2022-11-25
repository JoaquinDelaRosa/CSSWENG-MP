import { useForm } from "react-hook-form";
import { FormDivStyle } from "../../style/FormStyle";
import { isAlphabetic, isAlphaNumeric, isLicensePlate } from "../../utils/Regex";
import { VehicleRequest } from "./VehicleDetails";

const DEFAULT = "DEFAULT";

export const RequestVehicle = (props : {setResponse : Function, default? : VehicleRequest, isInForm? : boolean}) => {
    
    const {register, handleSubmit, formState: {errors}} = useForm<VehicleRequest>()
    const isInForm = (props.isInForm) ? props.isInForm : true;

    const onSubmit = handleSubmit((data) => {
        props.setResponse(data);
    });

    return (
        <FormDivStyle>
            <p><u>-- Vehicle --</u></p>
            <br />
            {
                !isInForm && 
                <form onSubmit={onSubmit} autoComplete="off">
                    <RequestVehicleForm errors={errors} register={register} default={props.default}/>
                    <div>
                        <input type='button' name="submit" onClick={onSubmit}value={"SUBMIT"} />
                    </div>
                </form>
            }
            <br />
            {
                isInForm && 
                <div onSubmit={onSubmit}>
                    <RequestVehicleForm errors={errors} register={register} default={props.default}/>
                    <input type='button' name="submit" onClick={onSubmit}value={"SUBMIT"} />
                </div>
            }
            <br />
            <br />
        </FormDivStyle> 
    );
}

const RequestVehicleForm = (props : {register : Function, errors : any, default? : VehicleRequest}) => {
    
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(100),( val, index) => year - index);

    const register = props.register;
    const errors = props.errors;
    return (
        <>
            <div>
                <label htmlFor='licensePlate'>License Plate</label>
                <input
                {... register('licensePlate', {required: true, pattern: isLicensePlate})}
                type="text" name="licensePlate" defaultValue={props.default?.licensePlate}/>
                {errors.licensePlate && <p>License Plate is Required</p>}
            </div>
            <div>
                <label htmlFor='manufacturer' >Manufacturer</label>
                <input
                {... register('manufacturer', {required: true, pattern: isAlphabetic})}
                type="text" name="manufacturer" defaultValue={props.default?.manufacturer}/>
                {errors.manufacturer && <p>Manufacturer is Required</p>}
            </div>
            <div>
                <label htmlFor='model'>Model</label>
                <input
                {... register('model', {required: true, pattern: isAlphaNumeric})}
                type="text" name="model" defaultValue={props.default?.model}/>
                {errors.model && <p>Model is Required</p>}
            </div>
            <div>
                <label htmlFor='yearManufactured'>Year Manufactured</label>
                <select
                {...register('yearManufactured', {valueAsNumber: true, required: true, validate: {
                    isValid : (v : any) => {
                        return v!==DEFAULT;
                    }
                }})} 
                    defaultValue= {(props.default && props.default.yearManufactured) ? 
                        props.default.yearManufactured.valueOf():  {DEFAULT}}>
                    <option value={DEFAULT} disabled>  -- Select Year -- </option>
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
            <div>
                <label htmlFor='color'>Color</label>
                <input
                {... register('color', {pattern: isAlphaNumeric})}
                type="text" name="color" defaultValue={props.default?.color}/>
            </div>
            <div>
                <label htmlFor='engine'>Engine</label>
                <input
                {... register('engine', {pattern: isAlphaNumeric})}
                type="text" name="engine" defaultValue={props.default?.engine}/>
            </div>
            <br />
            <div className="largeBox">
                <label htmlFor='remarks'>Remarks</label>
                <textarea
                {... register('remarks', {pattern: isAlphaNumeric})}
                type="text" name="remarks" defaultValue={props.default?.remarks}/>
            </div>
            <br />
            <br />
        </>
    )
}