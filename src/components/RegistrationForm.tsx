import React from 'react';
import {useFormik} from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress, Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {registerStart, registerSuccess, registerFailure} from '../features/auth/authSlice';
import {userService} from '../services/userService';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";

const validationSchema = Yup.object({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10,11}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    address: Yup.string(),
    city: Yup.string(),
    birthdate: Yup.date()
        .nullable()
        .required('Birthdate is required')
        .max(new Date(), 'Birthdate cannot be in the future')
});

const RegistrationForm: React.FC = () => {
    const dispatch = useDispatch();
    const {isLoading, error, user} = useSelector((state: RootState) => state.auth);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            gender:'',
            birthdate: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                dispatch(registerStart());
                const response = await userService.register({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    address: values.address,
                    city: values.city,
                    gender: values.gender,
                    birthdate: values.birthdate ? dayjs(values.birthdate).format('YYYY-MM-DD') : null,
                });
                if (response) {
                    dispatch(registerSuccess(response));
                } else {
                    dispatch(registerFailure('Registration failed'));
                }
            } catch (error) {
                dispatch(registerFailure(error instanceof Error ? error.message : 'An error occurred'));
            }
        },
    });

    const popularCities = [
        'Berlin',
        'Magdeburg',
        'Münich',
        'Düsseldorf',
        'Dresden',
        'Dortmund',
        'Nürnberg'
    ];
    const genders = ['Male','Female'];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Ram Navmi, Hari Jayanti
                    Registration
                </Typography>
                <Typography component="h6" variant="h6" align="center" gutterBottom>
                    4th April 2025
                </Typography>
                {!user && (
                <Box component="form"
                     onSubmit={formik.handleSubmit}
                     sx={{mt: 3}}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                    />
                    <Autocomplete
                        options={genders}
                        disablePortal
                        sx={{width: 300}}
                        value={formik.values.gender}
                        onChange={(event, newValue) => {
                            formik.setFieldValue('gender', newValue);
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                fullWidth
                                id="gender"
                                name="gender"
                                label="Gender"
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && formik.errors.gender}
                                margin="normal"
                            />
                        }
                    />
                    <DatePicker
                        label="Birthdate"
                        value={formik.values.birthdate ? dayjs(formik.values.birthdate).startOf('day') : null}
                        onChange={(newValue) => {
                            formik.setFieldValue('birthdate', newValue ? newValue.startOf('day').toDate() : null);
                        }}
                        format="DD/MM/YYYY"
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: 'normal',
                                error: formik.touched.birthdate && Boolean(formik.errors.birthdate),
                                helperText: formik.touched.birthdate && formik.errors.birthdate,
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <Autocomplete
                        options={popularCities}
                        disablePortal
                        sx={{width: 300}}
                        value={formik.values.city}
                        onChange={(event, newValue) => {
                            formik.setFieldValue('city', newValue);
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                fullWidth
                                id="city"
                                name="city"
                                label="City"
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                margin="normal"
                            />}
                    />
                    {error && (
                        <Typography color="error" align="center" sx={{mt: 2}}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24}/> : 'Register'}
                    </Button>
                </Box>
                )}
            </div>
        </LocalizationProvider>
    );
};

export default RegistrationForm; 