import "./PopulerRecipesList.css"
import { useEffect, useState } from "react"
import { CartData, PostData, TopBrandsData } from "../../../data";
import { GiShoppingBag } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../../../redux/slices/CartSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const PopulerRecipesLists = () => {

    const [list, setList] = useState<string[] | null>(null);
    const [items, setItems] = useState<PostData[]>([]);
    const [burger, setburger] = useState<PostData[]>([]);
    const [kathiyawadi, setkathiyawadi] = useState<PostData[]>([]);
    const [sweet, setsweet] = useState<PostData[]>([]);
    const [selected, setSelected] = useState<string>("");
    const cart: CartData[] = useSelector((state: { cart: CartData[] }) => state.cart);
    const { TopBrandsSlice, loading, error } = useSelector((state: { topBrands: { TopBrandsSlice: TopBrandsData[], loading: boolean, error: string } }) => state.topBrands);
    const dispatch = useDispatch();

    const getPopulerRecipesData = (data: string | null): void => {
        try {
            const topBrandsData: TopBrandsData[] = TopBrandsSlice;
            const topBrandsFoodData = [];
            for (let i = 0; i < topBrandsData.length; i++) {
                topBrandsFoodData.push(topBrandsData[i].food);
            }
            console.log("topBrandsFoodData",topBrandsFoodData)
            const foodsDataWithDuplicates = [];
            for (let j = 0; j < topBrandsFoodData.length; j++) {
                for (let k = 0; k < topBrandsFoodData[j].length; k++) {
                    foodsDataWithDuplicates.push(topBrandsFoodData[j][k].food_items)
                }
            }
            //inside all data store pizza,burder,biryani...
            const foodsData = removeDuplicates(foodsDataWithDuplicates.flat());
            console.log(foodsData)
            //all food name store like burder,pizza,biryani...
            const foodsName: string[] = [];
            foodsData.forEach((element: PostData) => {
                foodsName.push(element.food_type);
            });
            
            const foodsNameList: string[] = Array.from(new Set(foodsName));
            //burger data
            const burgerData = foodsData.filter((item:any) => item.food_type === foodsNameList[1]);
            console.log("burgerData",burgerData)
            setburger(burgerData);
            //setkathiyawadi
            const setkathiyawadiData = foodsData.filter((item:any) => item.food_type === foodsNameList[5]);
            console.log("burgerData",setkathiyawadiData)
            setkathiyawadi(setkathiyawadiData);

            //sweet
            const sweetData = foodsData.filter((item:any) => item.food_type === foodsNameList[6]);
            console.log("setsweet",sweetData)
            setsweet(sweetData);
            console.log(foodsNameList)
            setList(foodsNameList);
            setSelected(data || foodsNameList[0]);
            const filteredItems: PostData[] = foodsData.filter((item: PostData) => item.food_type === (data || foodsNameList[0]));
            setItems(filteredItems);
        }
        catch (e) {
            console.log("Populer List levama error avi gy.");
        }
    }


    const removeDuplicates = (foodsArray: any) => {
        const uniqueIds = new Set();
        let uniqueIndex = 0;

        for (let i = 0; i < foodsArray.length; i++) {
            const id = foodsArray[i].id;
            if (!uniqueIds.has(id)) {
                uniqueIds.add(id);
                if (uniqueIndex !== i) {
                    foodsArray[uniqueIndex] = foodsArray[i];
                }
                uniqueIndex++;
            }
        }

        foodsArray.splice(uniqueIndex);

        return foodsArray;
    }

    const addToCart = (item: PostData) => {
        const { id, image, name, description, price, food_type, popular, time } = item;
        const quantity = 1;
        dispatch(add({ id, image, name, description, price, quantity, food_type, popular, time }));
    };

    const removeFromCart = (id: string) => {
        dispatch(remove(id));
    };

    useEffect(() => {
        getPopulerRecipesData(null);
    }, []);

    return (
        <div className="popular_recipes">
            <div className="popular_recipes_header">
                <img id="popular_recipes_header_img"  alt="" />
                <span id="popular_recipes_header_name">Popular Items You can try this...</span>
                <img id="popular_recipes_header_img" alt="" />
            </div>
            
           <div>
             <h2 className="titlecategory">Pizza</h2>
            <div className="popular_recipes_box_list">

                {
                    !loading ?
                        items?.map((item: PostData, index) => cart.some(i => i.id === item.id) ? (
                            <div key={index} className="popular_recipes_main_box">
                                <div className="popular_recipes_box">
                                    <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                        src={item.image} alt="Pizza" /></div>
                                    <div className="popular_recipes_subbox">
                                        <span id="popular_recipes_box_name">{item.name}</span>
                                        <span id="popular_recipes_box_time">{item.time}</span>
                                    </div>
                                    <span id="popular_recipes_box_address">{item.description}</span>
                                    <div className="propular-priceandcartbox">
                                        <div><span id="popular_recipes_box_price">₹{item.price}</span></div>
                                        <div className={`${true ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => removeFromCart(item.id)}>
                                            <PiShoppingCartSimpleLight className={`${true ? "text-white" : "text-black"}`} />
                                        </div>
                                    </div>
                                   
                                    {/* <div className="popular_recipes_box_center_border">
                                    </div>
                                    <div className="popular_recipes_circle_center_border"></div> */}
                                </div>
                            </div>
                        ) : <div key={index} className="popular_recipes_main_box">
                            <div className="popular_recipes_box">
                                <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                    src={item.image} alt="Pizza" /></div>
                                <div className="popular_recipes_subbox">
                                    <span id="popular_recipes_box_name">{item.name}</span>
                                    <span id="popular_recipes_box_time">{item.time}</span>
                                </div>
                                <span id="popular_recipes_box_address">{item.description}</span>
                                <div className="propular-priceandcartbox">
                                    <div>
                                        <span id="popular_recipes_box_price">₹{item.price}</span>
                                    </div>
                                       <div className={`${false ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => addToCart(item)}>
                                    <PiShoppingCartSimpleLight  className={`${false ? "text-white" : "text-black"}`}/>
                                </div>


                                </div>    
                             
                    
                            </div>
                        </div>) : <Spinner />
                }
               
            </div>
           </div>
           <div>
             <h2 className="titlecategory">Burger</h2>
            <div className="popular_recipes_box_list">

                {
                    !loading ?
                        burger?.map((item: PostData, index) => cart.some(i => i.id === item.id) ? (
                            <div key={index} className="popular_recipes_main_box">
                                <div className="popular_recipes_box">
                                    <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                        src={item.image} alt="Pizza" /></div>
                                    <div className="popular_recipes_subbox">
                                        <span id="popular_recipes_box_name">{item.name}</span>
                                        <span id="popular_recipes_box_time">{item.time}</span>
                                    </div>
                                    <span id="popular_recipes_box_address">{item.description}</span>
                                    <div className="propular-priceandcartbox">
                                        <div><span id="popular_recipes_box_price">₹{item.price}</span></div>
                                        <div className={`${true ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => removeFromCart(item.id)}>
                                            <PiShoppingCartSimpleLight className={`${true ? "text-white" : "text-black"}`} />
                                        </div>
                                    </div>
                                   
                                    {/* <div className="popular_recipes_box_center_border">
                                    </div>
                                    <div className="popular_recipes_circle_center_border"></div> */}
                                </div>
                            </div>
                        ) : <div key={index} className="popular_recipes_main_box">
                            <div className="popular_recipes_box">
                                <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                    src={item.image} alt="Pizza" /></div>
                                <div className="popular_recipes_subbox">
                                    <span id="popular_recipes_box_name">{item.name}</span>
                                    <span id="popular_recipes_box_time">{item.time}</span>
                                </div>
                                <span id="popular_recipes_box_address">{item.description}</span>
                                <div className="propular-priceandcartbox">
                                    <div>
                                        <span id="popular_recipes_box_price">₹{item.price}</span>
                                    </div>
                                       <div className={`${false ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => addToCart(item)}>
                                    <PiShoppingCartSimpleLight  className={`${false ? "text-white" : "text-black"}`}/>
                                </div>


                                </div>    
                             
                                
                                {/* <div className="popular_recipes_box_center_border">
                                </div>
                                <div className="popular_recipes_circle_center_border"></div> */}
                            </div>
                        </div>) : <Spinner />
                }
               
            </div>
           </div>
           <div>
             <h2 className="titlecategory">Kathiyawadi</h2>
            <div className="popular_recipes_box_list">

                {
                    !loading ?
                        kathiyawadi?.map((item: PostData, index) => cart.some(i => i.id === item.id) ? (
                            <div key={index} className="popular_recipes_main_box">
                                <div className="popular_recipes_box">
                                    <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                        src={item.image} alt="Pizza" /></div>
                                    <div className="popular_recipes_subbox">
                                        <span id="popular_recipes_box_name">{item.name}</span>
                                        <span id="popular_recipes_box_time">{item.time}</span>
                                    </div>
                                    <span id="popular_recipes_box_address">{item.description}</span>
                                    <div className="propular-priceandcartbox">
                                        <div><span id="popular_recipes_box_price">₹{item.price}</span></div>
                                        <div className={`${true ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => removeFromCart(item.id)}>
                                            <PiShoppingCartSimpleLight className={`${true ? "text-white" : "text-black"}`} />
                                        </div>
                                    </div>
                                   
                                    {/* <div className="popular_recipes_box_center_border">
                                    </div>
                                    <div className="popular_recipes_circle_center_border"></div> */}
                                </div>
                            </div>
                        ) : <div key={index} className="popular_recipes_main_box">
                            <div className="popular_recipes_box">
                                <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                    src={item.image} alt="Pizza" /></div>
                                <div className="popular_recipes_subbox">
                                    <span id="popular_recipes_box_name">{item.name}</span>
                                    <span id="popular_recipes_box_time">{item.time}</span>
                                </div>
                                <span id="popular_recipes_box_address">{item.description}</span>
                                <div className="propular-priceandcartbox">
                                    <div>
                                        <span id="popular_recipes_box_price">₹{item.price}</span>
                                    </div>
                                       <div className={`${false ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => addToCart(item)}>
                                    <PiShoppingCartSimpleLight  className={`${false ? "text-white" : "text-black"}`}/>
                                </div>


                                </div>    
                             
                                
                                {/* <div className="popular_recipes_box_center_border">
                                </div>
                                <div className="popular_recipes_circle_center_border"></div> */}
                            </div>
                        </div>) : <Spinner />
                }
               
            </div>
           </div>
           <div>
             <h2 className="titlecategory">Sweet</h2>
            <div className="popular_recipes_box_list">

                {
                    !loading ?
                        sweet?.map((item: PostData, index) => cart.some(i => i.id === item.id) ? (
                            <div key={index} className="popular_recipes_main_box">
                                <div className="popular_recipes_box">
                                    <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                        src={item.image} alt="Pizza" /></div>
                                    <div className="popular_recipes_subbox">
                                        <span id="popular_recipes_box_name">{item.name}</span>
                                        <span id="popular_recipes_box_time">{item.time}</span>
                                    </div>
                                    <span id="popular_recipes_box_address">{item.description}</span>
                                    <div className="propular-priceandcartbox">
                                        <div><span id="popular_recipes_box_price">₹{item.price}</span></div>
                                        <div className={`${true ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => removeFromCart(item.id)}>
                                            <PiShoppingCartSimpleLight className={`${true ? "text-white" : "text-black"}`} />
                                        </div>
                                    </div>
                                   
                                    {/* <div className="popular_recipes_box_center_border">
                                    </div>
                                    <div className="popular_recipes_circle_center_border"></div> */}
                                </div>
                            </div>
                        ) : <div key={index} className="popular_recipes_main_box">
                            <div className="popular_recipes_box">
                                <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                    src={item.image} alt="Pizza" /></div>
                                <div className="popular_recipes_subbox">
                                    <span id="popular_recipes_box_name">{item.name}</span>
                                    <span id="popular_recipes_box_time">{item.time}</span>
                                </div>
                                <span id="popular_recipes_box_address">{item.description}</span>
                                <div className="propular-priceandcartbox">
                                    <div>
                                        <span id="popular_recipes_box_price">₹{item.price}</span>
                                    </div>
                                       <div className={`${false ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => addToCart(item)}>
                                    <PiShoppingCartSimpleLight  className={`${false ? "text-white" : "text-black"}`}/>
                                </div>


                                </div>    
                             
                                
                                {/* <div className="popular_recipes_box_center_border">
                                </div>
                                <div className="popular_recipes_circle_center_border"></div> */}
                            </div>
                        </div>) : <Spinner />
                }
               
            </div>
           </div>
        </div>
    )
}

export default PopulerRecipesLists


