import React, { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';


const DeleteCustomer = () => {
    const [deleteId, setDeleteId] = useState<number>(-1);

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.deleteCustoemr).delete({"id" : deleteId})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    return (
        <div>
            <p> Delete </p>
            <form>
                <label> Id </label>
                <input type="number"
                    name="id"
                    onChange={(e) => { setDeleteId(parseInt(e.target.value)); }}
                />

                <input type='button'
                    name="submit"
                    onClick={onSubmit}
                    value={"submit"} />
            </form>
        </div>
    );
}

export default DeleteCustomer;