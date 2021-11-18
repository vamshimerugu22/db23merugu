var pancake = require('../models/pancake'); 
 
// List of all pancakes 
exports.pancake_list = async function(req, res) { 
    try{ 
        thepancake = await pancake.find(); 
        res.send(thepancake); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
 
// for a specific pancake. 
exports.pancake_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await pancake.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 
 
// Handle pancake create on POST. 
exports.pancake_create_post =async function(req, res) { 
    console.log(req.body) 
    let document = new pancake(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"pancake_type":"goat", "cost":12, "size":"large"} 
    document.pancake_type = req.body.pancake_type; 
    document.price = req.body.price; 
    document.toppings = req.body.toppings; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

 
// Handle pancake delete form on DELETE. 
exports.pancake_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await pancake.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
}; 
 
// Handle pancake update form on PUT. 
exports.pancake_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await pancake.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.pancake_type)  
               toUpdate.pancake_type = req.body.pancake_type; 
        if(req.body.price) toUpdate.price = req.body.price; 
        if(req.body.toppings) toUpdate.toppings = req.body.toppings; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 


// VIEWS 
// Handle a show all view 
exports.pancake_view_all_Page = async function(req, res) { 
    try{ 
        thepancake = await pancake.find(); 
        res.render('pancake', { title: 'pancake Search Results', results: thepancake }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// Handle a show one view with id specified by query 
exports.pancake_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await pancake.findById( req.query.id) 
        res.render('pancakedetail',  
{ title: 'pancake Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 