const epxress = require('express')
const app = epxress()

app.get('/', (req, res) => {
    res.send({ bye: 'buddy' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT)