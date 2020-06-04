import React, {useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';

const FormDiv = styled.div`
  label {
    margin: 10px 0px;

    &:after {
      content: ': ';
    }
  }

  .check:after {
    content: '';
  }

  input, select, checkbox {
    margin: 5px 0px;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.6rem;
  margin: 0;
`;

function UserForm(props) {
  useEffect(()=>{
    if (props.isEditing) {
      console.log(props);
      props.setFieldValue('name',props.name);
      props.setFieldValue('bio',props.bio);
      props.setFieldValue('id',props.id);
    }
  },[props.isEditing]);

  return (
    <Form>
      <FormDiv>
        <label htmlFor="name">Name</label><Field type="text" name="name" placeholder="Name" /><br />
        {props.touched.name && props.errors.name?<Error>{props.errors.name}</Error>:<></>}
        <label htmlFor="bio">Bio</label><Field type="text" name="bio" placeholder="Bio" /><br />
        {props.touched.bio && props.errors.bio?<Error>{props.errors.bio}</Error>:<></>}
        <Field type="hidden" name="id" />
        <button disabled={!props.isValid}>Submit</button>
      </FormDiv>
    </Form>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      bio: props.bio || "",
      id: props.id || null
    };
  },
  //id still gives same id... will need to find another way if going to edit

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Please include the user's name"),
    bio: Yup.string()
      .required("Please enter the user's bio")
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, formikBag) {
    console.log(values);
    const userToSave = {...values, id: formikBag.props.currentId};
    formikBag.props.addFunction(userToSave);

    formikBag.setStatus("Form Submitting!");
    formikBag.resetForm();



    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(UserForm);

export default FormikUserForm;
