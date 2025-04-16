import appointmentModel from "../models/appointmentModel.js";

const appointmentController = {};

//select
appointmentController.getAppointments = async (req, res) => {
    const appointments = await appointmentModel.find();
    res.json(appointments)
}

//insert
appointmentController.creareAppointment = async (req, res) => {
    const {
        date,
        time,
        reason,
        asignedDoctor,
        asignedPatient
    } = req.body;

    const newAppointment = new appointmentModel({date, time, reason, asignedDoctor, asignedPatient});
    await newAppointment.save()
    res.json({message : "Appointment saved"})

}

//delete
appointmentController.deleteAppointment = async (req, res) => {
    await appointmentModel.findOneAndDelete(req.params.id);
    res.json({message : "Appointment Deleted"}) 
}

appointmentController.updateAppointment = async (req, res) => {
    const {
        date,
        time,
        reason,
        asignedDoctor,
        asignedPatient
    } = req.body;

    await appointmentModel.findByIdAndUpdate(req.params.id, {
        date,
        time,
        reason,
        asignedDoctor,
        asignedPatient
    } , {new : true});

    res.json({message : "Appointment Updated"}) 
}



export default appointmentController;