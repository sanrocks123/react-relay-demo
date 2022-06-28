
import { useEffect, useState } from "react";
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { userNameBroadcastChannelName, userNameValidationChannelName } from '../utils/BroadcastChannel'

export default function BroadcastComponent() {
    console.log('broadcast component loaded');
    return (
        <div>
            <UserNameSearch />
            <UserNameValidation />
        </div>
    );
}

function UserNameSearch() {
    const userNameBroadcastChannel = new BroadcastChannel(userNameBroadcastChannelName);
    const userNameValidationChannel = new BroadcastChannel(userNameValidationChannelName);
    const [form, setForm] = useState({ name: '' });
    const [result, setResult] = useState({ isAlreadyTaken: false });

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
        userNameBroadcastChannel.postMessage(form);
    }, [form]);

    return (
        <div>
            <p>UserNameSearchComponent</p>
            <Formik initialValues={form} onSubmit={onSubmit}>
                <Form>
                    <Field id="name" name="name" placeholder="type here" />
                    <button type="submit">Check</button>
                </Form>
            </Formik>
            <p>Status : {result.isAlreadyTaken ? "Sorry, username already taken !" : "Great, this is available !"}</p>
        </div>
    );
}

function UserNameValidation() {

    const userNameBroadcastChannel = new BroadcastChannel(userNameBroadcastChannelName);
    const userNameValidationChannel = new BroadcastChannel(userNameValidationChannelName);

    const [userNames, setUserNames] = useState(['sanrocks123']);
    const [data, setData] = useState({ value: 'mockapis' });

    useEffect(() => {

        userNameBroadcastChannel.onmessage = event => {
            console.log('userNameBroadcastChannel onMessage: ' + JSON.stringify(event.data))
            setData({ value: event.data.name });
        }

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
            <br />
            <p>UserNameValidationComponent</p>
            {
                userNames.map((v, k) => (
                    <div key={k}> {JSON.stringify(v)}</div>
                ))
            }
        </div>
    );
}
