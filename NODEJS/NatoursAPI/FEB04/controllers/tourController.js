const express = require('express');
const fs = require('fs');


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req,res)=>{
    res.status(200).json({
        status : 'success',
        result : tours.length,
        data : {
         tours
        }
    })
    }

    exports.getOneTour = (req,res)=>{
    const id = req.params.id*1;
    // if(id>tours.length)
const tour = tours.find(el => (el.id == id));
    if(!tour)
    {return res.status(404).json({
        staus:"fail",
        message : "Invalid Id"
    })
}
    res.status(200).json({
        
        status : 'success',
        result : tours.length,
        data : {
        tour
        }
    })
   }
   exports.createTour = (req,res)=>{
    const newId = tours[tours.length - 1].id+1;
    const newTour = Object.assign({id : newId,},req.body)
    console.log(newTour);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    res.status(201).json({
        status : "success",
        data : {
            newTour
        }
    })
    })
}

   exports.deleteTour = (req,res)=>{
       if(req.params.id * 1 > tours.length){
    res.status(200).json({
        staus : "deleted"
    })
}
}

exports.updateTour = (req,res)=>{
    res.status(200).json({
        staus : "updated"
    })
}

