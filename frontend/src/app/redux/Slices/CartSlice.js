import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://fully-ecommerce-1.onrender.com/api/cart";


// ===============================
// Session Key
// ===============================
const getSessionKey = () => {

  if (typeof window === "undefined") {
    return null;
  }

  let sessionKey = localStorage.getItem("sessionKey");

  if (!sessionKey) {

    sessionKey =
      Date.now().toString(36) +
      Math.random().toString(36).substring(2);

    localStorage.setItem(
      "sessionKey",
      sessionKey
    );
  }

  return sessionKey;
};



// ===============================
// Add Cart
// ===============================
export const addToCart = createAsyncThunk(
  "cart/addToCart",

  async(
    {productId, quantity},
    {rejectWithValue}
  )=>{

    try {
  const sessionKey = getSessionKey();

  console.log({
    sessionKey,
    productId,
    quantity,
  });

  const res = await axios.post(
    `${API}/add`,
    {
      sessionKey,
      productId,
      quantity,
    }
  );

  console.log("SUCCESS", res.data);

  return res.data;

} catch (error) {

  console.log("ERROR", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  } else {
    console.log("Message:", error.message);
  }

  return rejectWithValue(
    error.response?.data?.message || error.message
  );
}

  }
);



// ===============================
// Fetch Cart
// ===============================
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async(_, {rejectWithValue})=>{

    try{

      const sessionKey = getSessionKey();


      const res = await axios.get(
        `${API}/${sessionKey}`
      );


      return res.data;


    }catch(error){

      return rejectWithValue(
        error.response?.data?.message ||
        "Fetch cart failed"
      );

    }

  }
);



// ===============================
// Update Quantity
// ===============================
export const updateCart = createAsyncThunk(
  "cart/updateCart",

  async(
    {itemId, quantity},
    {rejectWithValue}
  )=>{

    try{

      const sessionKey = getSessionKey();


      const res = await axios.patch(
        `${API}/update`,
        {
          sessionKey,
          itemId,
          quantity
        }
      );


      return res.data;


    }catch(error){

      return rejectWithValue(
        error.response?.data?.message ||
        "Update failed"
      );

    }

  }
);




// ===============================
// Remove Item
// ===============================
export const removeCartItem = createAsyncThunk(
"cart/removeCartItem",

async(
itemId,
{rejectWithValue}
)=>{

try{

const sessionKey=getSessionKey();


const res = await axios.delete(
`${API}/remove/${itemId}`,
{
data:{
sessionKey
}
}
);


return res.data;


}catch(error){

return rejectWithValue(
error.response?.data?.message ||
"Remove failed"
);

}

}
);




// ===============================
// Clear Cart
// ===============================
export const clearCart = createAsyncThunk(
  "cart/clearCart",

  async(_, {rejectWithValue})=>{


    try{

      const sessionKey = getSessionKey();


      await axios.delete(
        `${API}/clear/${sessionKey}`
      );


      return true;


    }catch(error){

      return rejectWithValue(
        error.response?.data?.message ||
        "Clear failed"
      );

    }

  }
);




// ===============================
// Initial State
// ===============================
const initialState = {

  cart:null,

  items:[],

  total:0,

  cartCount:0,

  loading:false,

  updating:false,

  error:null

};




// ===============================
// Update State Helper
// ===============================
const setCartState = (
  state,
  payload
)=>{

  if(!payload) return;


  state.cart = payload;


  state.items =
    payload.items || [];


  state.total =
    payload.total || 0;



  state.cartCount =
    state.items.reduce(
      (sum,item)=>
        sum + item.quantity,
      0
    );

};





const cartSlice = createSlice({

name:"cart",

initialState,


reducers:{},


extraReducers:(builder)=>{


builder



// FETCH

.addCase(fetchCart.pending,(state)=>{
state.loading=true;
})


.addCase(fetchCart.fulfilled,(state,action)=>{

state.loading=false;

setCartState(
state,
action.payload
);

})


.addCase(fetchCart.rejected,(state,action)=>{

state.loading=false;

state.error=action.payload;

})




// ADD

.addCase(addToCart.pending,(state)=>{

state.updating=true;

})


.addCase(addToCart.fulfilled,(state,action)=>{

state.updating=false;

setCartState(
state,
action.payload
);

})


.addCase(addToCart.rejected,(state,action)=>{

state.updating=false;

state.error=action.payload;

})





// UPDATE

.addCase(updateCart.pending,(state)=>{

state.updating=true;

})


.addCase(updateCart.fulfilled,(state,action)=>{

state.updating=false;

setCartState(
state,
action.payload
);

})


.addCase(updateCart.rejected,(state,action)=>{

state.updating=false;

state.error=action.payload;

})





// REMOVE

.addCase(removeCartItem.fulfilled,(state,action)=>{

setCartState(
state,
action.payload
);

})





// CLEAR

.addCase(clearCart.fulfilled,(state)=>{

state.cart=null;

state.items=[];

state.total=0;

state.cartCount=0;

})


}

});


export default cartSlice.reducer;