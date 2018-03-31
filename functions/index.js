const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const { AUTHENTICATED_USER_EMAILS, GMAIL_SETTINGS, RECIPIENT_EMAILS } = require('./appConfig')

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

		console.log('function side approved ======>', company, description, num, owner, status)

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
			from: `${owner} <${owner}@aoausa.com>`,
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

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				const message = `Error sending email ${error}`
				console.log(message)
				return { status: 'failure', message }
			}
			const message = `Message ${info.messageId} sent: ${info.response}`
			console.log(message)
			return { status: 'success', message }
		})
	} else {
		const message = `You are not an approved user: ${userEmail}`
		console.log(message)
		return { status: 'blocked', message }
	}
})
