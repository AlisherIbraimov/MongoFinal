const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()
const {Types} = require('mongoose')

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrlClient = config.get('baseUrlClient')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({ from })

        if (existing) {
            return res.json({ link: existing })
        }

        const to = baseUrlClient + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try it again!' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try it again!' })
    }
})

router.get('/overall-data', auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const clicksCount = await Link.aggregate([
            { $match: { owner: Types.ObjectId(userId) }, }, 
            {
                $group: {
                    _id: null,
                    totalClicks: { $sum: "$clicks" },
                    averageClicks: { $avg: "$clicks" },
                    minClicks: { $min: "$clicks" },
                    maxClicks: { $max: "$clicks" },
                }
            }
        ])
        res.json(clicksCount)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try it again!' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try it again!' })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findOneAndDelete({ _id: req.params.id });
        res.json({ success: true })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try it again!' })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const {from} = req.body

        const link = await Link.findOne({ _id: req.params.id })

        if (link) {
            link.from = from;
            console.log(link.from)
            await link.save()
            return res.json({ success: true })
        }

        res.status(404).json('Not found')
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try it again!' })
    }
})

module.exports = router
