import AsyncHandler from 'express-async-handler';
import Order from '../models/OrderList.js';

export const orderController = (AsyncHandler(async (req, res) => {
    
    console.log('userId',req.user._id)
    const { orderItems,
         shippingAddress,
          paymentMethod,
           totalPrice,
            taxPrice,
            shippingPrice,
            itemsPrice,
         } = req.body

         try{
            if(orderItems && orderItems.length==0){
                res.status(400);
                throw new Error('There is No items')
            }
            else{

                const currentOrder=await Order.findOne({user:req.user._id})

                
                if(currentOrder){
                    currentOrder.orderItems=orderItems;
                    currentOrder.shippingAddress=shippingAddress;
                    currentOrder.taxPrice=taxPrice;
                    currentOrder.shippingPrice=shippingPrice;
                    currentOrder.paymentMethod=paymentMethod;
                    currentOrder.itemsPrice=itemsPrice;
                    currentOrder.totalPrice=totalPrice;
                    currentOrder.user=req.user.id;
                    await currentOrder.save();
                    res.status(201).json(currentOrder)
                }
                

                    else{

                        console.log('user is not created Yeet');
                        const order= new Order({
                            shippingAddress,
                            user:req.user._id,
                            paymentMethod,
                             totalPrice,
                              taxPrice,
                              shippingPrice,
                              itemsPrice,
                              orderItems,
                        })
                        await order.save();
                        res.status(201).json(order)
                    }
                    
                }
            }
         catch(e){
            console.log('errro',e)
            res.json(e)

         }
}))


//@ desc : get all orders by id 
// @ path:/api/order/:id
// @ access private
export const getOrderById=(AsyncHandler(async (req,res)=>{
    const id=req.params.id;
    try{

        const order=await Order.findById(id).populate('user' , 'name email')
        if(order){
            res.status(200).json(order);
        }
        else{
            res.status(404).json('No Order Has been Placed')
        }
    }catch(e){
        res.status(403).json('You tried invalid order')
    }
}))