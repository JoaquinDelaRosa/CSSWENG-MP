import React, { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';

const DeleteVehicle = () => {
    const [deleteId, setDeleteId] = useState<number>(-1);

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>)  => {
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.deleteVehicle).delete({"id" : deleteId})
            .then(function (response) {
                console.log(response);
            }) 
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div>
            <p> Delete </p>
            <form>
                <input type="number" name="id"
                onChange={(e) => {setDeleteId(parseInt(e.target.value)); }} />

                <input type="button" 
                    name="submit" 
                    onClick={onSubmit} 
                    value={"submit"}/>
            </form>
        </div>
    );
}

export default DeleteVehicle;