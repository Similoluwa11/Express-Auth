const fs = require('node:fs')
const path = require('path');
const itemsFilePath = path.join(__dirname, 'items.json')
let items = fs.readFileSync(itemsFilePath);
const getItems = (req, res)=>{
    const query = req.query;
    let itemsDuplicate = JSON.parse(items);
    
    if(query.name) {
        itemsDuplicate = itemsDuplicate.filter(item => item.name.includes(query.name))
    }
    if(query.price) {
        itemsDuplicate = itemsDuplicate.filter(item => item.price.includes(query.price))
    }
    if(query.size) {
        itemsDuplicate = itemsDuplicate.filter(item => item.size.includes(query.size))
    }
    if (query.limit) {
        itemsDuplicate = itemsDuplicate.slice(0, req.limit - 1)
    }
    if (query.search) {
        itemsDuplicate = itemsDuplicate.filter(item => item.progam.includes(query.search) || 
        item.name.includes(query.search) || item.department.includes(query.search))
    }
    res.status(200).json({
        data: itemsDuplicate,
        error: null
    })
}
const createItem = (req, res)=>{
    const item = { ...req.body, id: Math.floor(Math.random() * 50).toString()};
    let oldItems = JSON.parse(items);
    const allItems = [...oldItems, item];
    //console.log(allItems);
    const allItemsString = JSON.stringify(allItems)
    const createdItems = fs.writeFileSync('\items.json', allItemsString);
    return res.status(201).json({
        data: allItems,
        error: null
    })
}
const getOneItem = (req,res)=>{
    const id = req.params.id; 
    const itemsParsed = JSON.parse(items);
    const itemIndex = itemsParsed.findIndex((item)=>{
        return item.id == parseInt(id)
    })
    if(itemIndex === -1){
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(itemsParsed[itemIndex])
}
const updateItem = (req, res)=>{
    const id = req.params.id;
    const update = req.body;
    const itemsParsed = JSON.parse(items);
    const itemIndex = itemsParsed.findIndex((item)=>{
        return item.id == parseInt(id)
    })
    if(itemIndex === -1){
        res.end(`item with id ${id} is not found`)
        return
    }
    itemsParsed[itemIndex] = {...itemsParsed[itemIndex], ...update}
    res.status(200).json(itemsParsed[itemIndex])
}
const deleteItem = (req,res)=>{
    const id = req.params.id
    const itemsParsed = JSON.parse(items);
    const itemIndex = itemsParsed.findIndex((item)=>{
        return item.id == parseInt(id)
    })
    if(itemIndex === -1){
        res.end(`Item with id:${id} is not found`)
        return
    }
    itemsParsed.splice(itemsParsed[itemIndex], 1)
    res.end(`Item with id:${id}, deleted successfully`)
}
module.exports = {
    getItems,
    createItem,
    getOneItem,
    updateItem,
    deleteItem
}