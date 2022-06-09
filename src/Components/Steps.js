import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { sequenceProtoToMidi } from '@magenta/music';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';
// import Lottie from 'react-lottie'
import notesLoader from '../lotties/52679-music-loader.json'
export default class VerticalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processing:false,
            model: props.model,
            activeStep: 0,
            inputLink:' ',
            validURL:false
            };
            // this.inputLink=React.createRef(null);
    }


    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 })
    };

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    };

    handleReset = () => {
        this.setState({ activeStep: 0 })
    };

    getfileAndProcess=async(e)=>{
        console.log(this.state.inputLink)
        fetch(this.state.inputLink)
            .then(response => {
                response.blob().then(blob => {
                    var file = new File([blob], "file.wav");
                    console.log(file)
                    var data={
                        target:{
                            files:[file]
                        }
                    }
                    this.processFile(data)
                })
            })

    } 
    processFile = async (e) => {
        // const formData = new FormData();
        // formData.append('file', e.target.files[0]);
        // axios.post('/process', formData).then(res => {
        //     //Now do what you want with the response;
        //   })
        // requestAnimationFrame(() => requestAnimationFrame(() => {
        this.setState({processing:true})
        setTimeout(() => {
            requestAnimationFrame(() => requestAnimationFrame(() => {
                this.state.model.transcribeFromAudioFile(e.target.files[0]).then((ns) => {
                    // window.saveAs(new File([sequenceProtoToMidi(ns)], 'transcription.mid'));
                    this.setState({ convertedFile: new File([sequenceProtoToMidi(ns)], 'transcription.mid') });
                    this.setState({processing:false})
                    this.handleNext();
                    // window.location=link;
                    //   }));

                })
            }))
        }, 250)



    }
    validateLink=(e)=>{
        if (e.target.value.match(/\b(https?:\/\/\S*\b)/g)) {
            this.setState({ errorText: ' ' })
            this.setState({inputLink:e.target.value})
            this.setState({validURL:true})
          } else {
            this.setState({ errorText: 'Invalid URL' })
            this.setState({validURL:false})
          }
       
    }
    processURLFile = async () => {
            if(!this.state.validURL||this.state.processing){
                return
            }
            this.setState({processing:true})
            setTimeout(() => {
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    this.state.model.transcribeFromAudioURL(this.state.inputLink).then((ns) => {
                        // window.saveAs(new File([sequenceProtoToMidi(ns)], 'transcription.mid'));
                        this.setState({ convertedFile: new File([sequenceProtoToMidi(ns)], 'transcription.mid') });
                        this.setState({processing:false})
                        this.handleNext();
    
                    }).catch(err=>{
                        alert("Oops something went wrong please use a different URL or try again later.")
                        this.setState({processing:false})
                        this.handleReset()
                    })
                }))
            }, 250)
    }
    download = (e) => {
        saveAs(this.state.convertedFile);
    }
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: notesLoader,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        return (
            <Box >
                <Stepper activeStep={this.state.activeStep} orientation="vertical">
                    <Step>
                        <StepLabel co>
                            <Typography color="white">Get Started</Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography fontWeight={'bold'} color="white">{this.state.processing?'Processing your file. Please Wait...':'Upload a file or enter audio file URL to get started.'}</Typography>
                                                       {/* <Button
                                    variant="contained"
                                    onClick={this.handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
                                </Button> */}

                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <section className="container" style={{marginBottom:10}}>
                                    <img src="animation_500_l43bhbax.gif" width='400'/><br/>
                                    <TextField
                                        id="outlined-helperText"
                                        label="URL to audio file"
                                        defaultValue=""
                                        value={this.inputLink}
                                        onChange={this.validateLink}
                                        helperText={this.state.errorText}
                                        inputProps={{ style: { color: "White" } }}
                                        focused
                                        errorText= {this.state.errorText}
                                        FormHelperTextProps={{ style: { color: "Red" } }}
                                        />
                                        {this.state.validURL &&
                                    <Button hidden={true} style={{height:56,marginLeft:5}} className='submitLink' variant="contained" component="label" color="primary" onClick={this.processURLFile} >
                                            {" "}
                                            
                                           submit
                                        </Button>
                                    }
                                    </section>
                                    <Button className='uploadButton' variant="contained" component="label" color="primary" onChange={this.processFile} disabled={this.state.processing}>
                                            {" "}
                                           {this.state.processing? 'please wait...': 'Upload'}
                                            <input type="file" hidden />
                                        </Button>
                                        
                                        <Typography className='note-text' fontStyle={'italic'} color="white">{this.state.processing?'Please note that your browser might feel sluggish while conversion is in progress.':''}</Typography>
                                        
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>
                            <Typography color="white">Finished</Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography color="white">Your MIDI file is ready.</Typography>

                            <section className="container">
                                <Button variant="contained" component="label" color="primary" onClick={this.download}>
                                    Download
                                </Button>
                                {/* <Paper square elevation={0} sx={{ p: 3 }}> */}
                                    <Typography color="white">Want to convert another file??</Typography>
                                    <Button onClick={this.handleReset} sx={{ mt: 1, mr: 1 }}>
                                        Start Again
                                    </Button>
                                {/* </Paper> */}
                            </section>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    {/* <Button
                                    variant="contained"
                                    onClick={this.handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    finish
                                </Button>
                                <Button
                                    onClick={this.handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button> */}
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
            </Box>
        )
    }
}
