import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import signIn from "@/firebase/auth/signin";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Checkbox
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleForm = async (event) => {
    event.preventDefault()

    const { result, error } = await signIn(email, password);
    

    if (error) {
      toast.error('Inavlid Credentials');
      
        return console.log(error)

    }

    // else successful
    toast.success('Welcome!')
    return router.push("/")
}

console.log(email)
const formik = useFormik({
  initialValues: {
    email: '',
    password: '',
    submit: null
  },
  validationSchema: Yup.object({
    email: Yup
      .string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup
      .string()
      .max(255)
      .required('Password is required')
  }),
  onSubmit: async (values, helpers) => {
    const { result, error } = await signIn(values.email, values.password);
    

    if (error) {
      toast.error('Inavalid Credential!', {
        autoClose: 3000,
      });
      
        return console.log(error.message)

    }

    // else successful
    toast.success('Welcome!', {
      autoClose: 1800,
    });
    return router.push("/")
}

});

const handleMethodChange = useCallback(
  (event, value) => {
    setMethod(value);
  },
  []
);


  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );

  return (
    <>
      <Head>
        <title>
          Login | Kwickmall
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="h6"
                style={{ marginTop: '50px', color:'#958F8F' }}
              >
               Login to your account
                
              </Typography>
              <Typography

                color="#958F8F"
                variant="body2"
              >
               Thanks for coming back to kwickmall
                
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}

                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}

                    type="password"
                    value={formik.values.password}
                    
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  
                </FormHelperText>
                
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <FormControlLabel
      control={<Checkbox color="error" />}
      label="Remember me"
      sx={{ color: 'text.secondary' }}
    />
    <Link
      component={NextLink}
      href="/auth/forgot-password"
      variant="subtitle2"
      sx={{ color: '#FF6600' }}
    >
      Forgot password?
    </Link>
  </Box>

                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3, backgroundColor: '#FF6600',
                  '&:hover': {
                    backgroundColor: '#FF4500',
                  },
                 }}
                  type="submit"
                  variant="contained"
                  
                >
                  Continue
                </Button>
                <Button
  fullWidth
  size="large"
  sx={{ mt: 3, color: '#958F8F' }}
  onClick={handleSkip}
>
  <span style={{ marginRight: '8px' }}>Don't have an account?</span>
  <span style={{ color: '#FF6600' }}>Sign up</span>
</Button>

             
                
               
              </form>
            )}
            {method === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                 
                </Typography>
                <Typography color="text.secondary">
                 
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
