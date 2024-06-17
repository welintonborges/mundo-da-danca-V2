
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Nome", accessor: "nome", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "Ação", accessor: "acao", align: "center" },
    ],

    rows: [
      {
        nome: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        function: <Job title="Manager" description="Organization" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        acao: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        nome: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        acao: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        nome: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        function: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        acao: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        nome: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        acao: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        nome: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        function: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        acao: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}




//aqui salvar
//
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
//
// const steps = ['Dados', 'Endereço', 'outros'];
//
// export default function HorizontalLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());
//
//   const isStepOptional = (step) => {
//     return step === 1;
//   };
//
//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };
//
//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }
//
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };
//
//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };
//
//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }
//
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };
//
//   const handleReset = () => {
//     setActiveStep(0);
//   };
//
//   return (
//       <Box sx={{ width: '100%' }}>
//         <Stepper activeStep={activeStep}>
//           {steps.map((label, index) => {
//             const stepProps = {};
//             const labelProps = {};
//             // if (isStepOptional(index)) {
//             //   labelProps.optional = (
//             //     <Typography variant="caption">Optional</Typography>
//             //   );
//             // }
//             if (isStepSkipped(index)) {
//               stepProps.completed = false;
//             }
//             return (
//                 <Step key={label} {...stepProps}>
//                   <StepLabel {...labelProps}>{label}</StepLabel>
//                 </Step>
//             );
//           })}
//         </Stepper>
//         {activeStep == 0 ? (
//             <React.Fragment>
//               <Typography sx={{ mt: 2, mb: 1 }}>oi a {activeStep}</Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                 <Box sx={{ flex: '1 1 auto' }} />
//                 {/* <Button onClick={handleReset}>Reset</Button> */}
//                 <Button onClick={handleNext}>
//                   {activeStep === steps.length - 1 ? 'Finish' : 'Proximar'}
//                 </Button>
//               </Box>
//             </React.Fragment>
//         ) : (
//             <React.Fragment>
//               {activeStep == 1 ? (
//                   <Typography sx={{ mt: 2, mb: 1 }}>oi a {activeStep + 1}</Typography>
//               ) : (
//                   <Typography sx={{ mt: 2, mb: 1 }}>oi b {activeStep + 1}</Typography>
//               )}
//
//               {activeStep == 3 ? (
//                   <Typography sx={{ mt: 2, mb: 1 }}>oi c {activeStep + 1}</Typography>
//               ) : (
//                   ''
//               )}
//               <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                 <Button
//                     color="inherit"
//                     disabled={activeStep === 0}
//                     onClick={handleBack}
//                     sx={{ mr: 1 }}
//                 >
//                   Canselar
//                 </Button>
//                 <Box sx={{ flex: '1 1 auto' }} />
//                 {isStepOptional(activeStep) && (
//                     <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                       voltar
//                     </Button>
//                 )}
//
//                 <Button onClick={handleNext}>
//                   {activeStep === steps.length - 1 ? 'Finish' : 'Proximar'}
//                 </Button>
//               </Box>
//             </React.Fragment>
//         )}
//       </Box>
//   );
// }

//fim