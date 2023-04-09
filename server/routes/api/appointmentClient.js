const express = require('express');
const {
  getAvailableAppointments,
  bookAppointmentById,
  viewPastAppointmentsClient,
  viewUpcomingAppointmentsClient,
} = require('../../models/appointment');
const onlyClient = require('../../middlewares/onlyClient');

const router = express.Router();

router.use(onlyClient);

router.get('/', (req, res, next) => {
  const { consultant, year, month, date } = req.query;
  const dateObj = new Date(year, month, date);

  getAvailableAppointments(consultant, dateObj)
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((err) => {
      res.sendStatus(500);
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { appointmentId } = req.body;
  const { id } = req.user;

  bookAppointmentById(appointmentId, id)
    .then((appointment) => {
      res.json(appointment);
    })
    .catch((err) => {
      res.sendStatus(500);
      next(err);
    });
});

router.get('/past', (req, res, next) => {
  const { id } = req.user;
  viewPastAppointmentsClient(id)
    .then((data) => {
      const filteredData = data.filter(
        (appointment) => appointment.client !== undefined
      );
      res.json(filteredData);
    })
    .catch(next);
});

router.get('/upcoming', (req, res, next) => {
  const { id } = req.user;
  viewUpcomingAppointmentsClient(id)
    .then((data) => {
      const filteredData = data.filter(
        (appointment) => appointment.client !== undefined
      );
      res.json(filteredData);
    })
    .catch(next);
});

module.exports = router;