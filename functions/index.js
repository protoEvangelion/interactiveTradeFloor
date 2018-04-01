const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const {
	AUTHENTICATED_USER_EMAILS,
	GMAIL_SETTINGS,
	RECIPIENT_EMAILS,
	USER_MAP,
} = require('./appConfig')

exports.emailTeam = functions.https.onCall((data, context) => {
	let isApprovedUser = false
	const userEmail = context.auth.token.email

	AUTHENTICATED_USER_EMAILS.map(email => {
		if (email === userEmail) {
			isApprovedUser = true
		}
	})

	if (isApprovedUser) {
		const { company, description, num, owner, status } = data

		console.log('updated ======>', company, description, num, owner, status)

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: GMAIL_SETTINGS.email,
				pass: GMAIL_SETTINGS.pass,
			},
		})

		const text = {
			data: `Booth #: ${num}
			Company: ${status === 'open' ? 'open' : company}
			Status: ${status}
			${description === '' ? '' : `Info: ${description}`}
			`,
		}

		const mailOptions = {
			from: `${owner} <${USER_MAP[owner].email}>`,
			to: RECIPIENT_EMAILS.join(','),
			subject: `${num}=${status === 'open' ? 'Open' : company}`,
			text: text.data,
			html: `
				<strong>
					Booth #</strong> ${num} = ${status === 'open' ? 'open' : company}
				</br><br>
				<strong>
					Status:</strong> ${status}
				</br><br>
				<strong>
					Info: </strong> ${status === 'open' ? 'n/a' : description}</br>
			`,
		}

		console.log('transporter ===>')

		return transporter
			.sendMail(mailOptions)
			.then(result => {
				const message = `Message ${result.messageId} sent: ${result.response}`
				console.log(`SUCCESS Result of send mail call ===> ${message}`)
				return { status: 'success', message }
			})
			.catch(error => {
				const message = `Error sending email ${error}`
				console.log(`FAILURE Result of send mail call ====> ${message}`)
				return { status: 'failure', message }
			})
	} else {
		const message = `You are not an approved user: ${userEmail}`
		console.log(message)
		return { status: 'blocked', message }
	}
})
