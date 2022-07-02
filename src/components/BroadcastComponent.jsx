
import { useEffect, useState } from "react";
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { userNameBroadcastChannelName, userNameValidationChannelName } from '../utils/BroadcastChannel'

export default function BroadcastComponent() {
    console.log('broadcast component loaded');
    return (
        <div className="row">
            <div className="col-md-6"><UserNameSearch /></div>
            <div className="col-md-6"><UserNameValidation /> </div>
        </div>
    );
}

function UserNameSearch() {
    const userNameBroadcastChannel = new BroadcastChannel(userNameBroadcastChannelName);
    const userNameValidationChannel = new BroadcastChannel(userNameValidationChannelName);
    const [form, setForm] = useState({ name: '' });
    const [result, setResult] = useState({ isAlreadyTaken: '' });

    const onSubmit = (values) => {
        console.log('onSubmitButtonClickEvent')
        setForm(values);
        // todo - save form data
    }


    userNameValidationChannel.onmessage = event => {
        console.log('userNameValidationChannel onMessage: ' + JSON.stringify(event.data))
        setResult({ isAlreadyTaken: event.data.isAlreadyTaken });
    }

    useEffect(() => {
        console.log('UserNameSearch: useEffect ' + JSON.stringify(form));
        if (form.name != "") {
            userNameBroadcastChannel.postMessage(form);
        }
    }, [form]);

    return (
        <div>
            <p>UserNameSearchComponent</p>
            <Formik initialValues={form} onSubmit={onSubmit}>
                <Form>
                    <div className="input-group mb-3">
                        <Field id="name" name="name" placeholder="type here" className="form-control" />
                        <button type="button" className="btn btn-primary">Check</button>
                    </div>
                </Form>
            </Formik>
            {result.isAlreadyTaken ? <p className="text-danger">Sorry, username already taken ! </p> : <p className="text-success">Great, this is available !</p>}
        </div>
    );
}

function UserNameValidation() {

    const userNameBroadcastChannel = new BroadcastChannel(userNameBroadcastChannelName);
    const userNameValidationChannel = new BroadcastChannel(userNameValidationChannelName);

    const [userNames, setUserNames] = useState(['']);
    const [data, setData] = useState({ value: '' });


    useEffect(() => {

        userNameBroadcastChannel.onmessage = event => {
            console.log('userNameBroadcastChannel onMessage: ' + JSON.stringify(event.data))
            setData({ value: event.data.name });
        }

        if (data.value == "") return;

        console.log('data : ' + data.value);
        const isFound = userNames.includes(data.value);
        if (isFound) {
            console.log('user name already exists - ' + data.value);
            userNameValidationChannel.postMessage({ isAlreadyTaken: isFound, message: data.value });
            return;
        }
        setUserNames(userNames => [...userNames, data.value]);
        userNameValidationChannel.postMessage({ isAlreadyTaken: isFound, message: data.value });
    }, [data]);

    return (
        <div id="UserNameValidation">
            <p>UserNameValidationComponent <span className="badge bg-info"> {userNames.length}</span> </p>
            {
                userNames.map((v, k) => (
                    <div key={k}> {JSON.stringify(v)}</div>
                ))
            }
        </div>
    );
}
