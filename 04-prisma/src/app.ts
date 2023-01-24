import express from "express"
import prisma from "./prisma" // importing the prisma instance we created
import morgan from "morgan"

const app = express()
app.use(express.json())
app.use(morgan('dev'))

/**
 * GET /
 */
app.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/**
 * GET /phones
 *
 * Get all phones
 */
app.get('/phones', async (req, res) => {
	try {
		const phones = await prisma.phones.findMany()
		res.send(phones)

	} catch (err) {
		console.error(err)
		res.status(500).send({
			message: "Something went wrong querying the database.",
		})
	}
})

/**
 * GET /phones/:phoneId
 *
 * Get a single phone
 */
app.get('/phones/:phoneId', async (req, res) => {
	const phoneId = Number(req.params.phoneId)

	try {
		const phone = await prisma.phones.findUniqueOrThrow({
			where: {
				id: phoneId,
			},
			include: {
				user: true,
			}
		})

		res.send(phone)

	} catch (err) {
		console.error(err)
		res.status(404).send({
			message: "Not found",
		})
	}
})

/**
 * POST /phones
 *
 * Create a phone
 */
app.post('/phones', async (req, res) => {
	try {
		const phone = await prisma.phones.create({
			data: req.body,
		})

		res.status(201).json(phone)

	} catch (err) {
		console.error(err)
		res.status(500).send({
			message: "Something went wrong creating the record in the database.",
		})
	}
})

/**
 * GET /users
 *
 * Get all users
 */
app.get('/users', async (req, res) => {
	try {
		const users = await prisma.users.findMany()
		res.send(users)

	} catch (err) {
		console.error(err)
		res.status(500).send({
			message: "Something went wrong querying the database.",
		})
	}
})

/**
 * GET /users/:userId
 *
 * Get a single user
 */
app.get('/users/:userId', async (req, res) => {
	const userId = Number(req.params.userId)

	try {
		const user = await prisma.users.findUniqueOrThrow({
			where: {
				id: userId,
			},
			include: {
				phones: true,
			}
		})

		res.send(user)

	} catch (err) {
		console.error(err)
		res.status(404).send({
			message: "Not found",
		})
	}
})

/**
 * POST /users
 *
 * Create a user
 */
app.post('/users', async (req, res) => {
	try {
		const user = await prisma.users.create({
			data: req.body,
		})

		res.status(201).json(user)

	} catch (err) {
		console.error(err)
		res.status(500).send({
			message: "Something went wrong creating the record in the database.",
		})
	}
})

export default app
