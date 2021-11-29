import { hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from '../utils'
import { createReview, deleteReview, editReview, getProduct } from '../api';
import  Rating  from "../components/Rating";
import { getUserInfo } from '../localStorage';
import Review from '../components/Review';

let done=false,isEdit=false;
const ProductScreen = {
    after_render:()=>{
        const request= parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',()=>{
            document.location.hash=`/cart/${request.id}`;
        });
        
        if(document.getElementById('review-form')){
            
            document
                .getElementById('review-form')
                .addEventListener('submit',async(e)=>{
                    e.preventDefault();
                    showLoading();
                    const data = await createReview(request.id,{
                        comment: document.getElementById('comment').value,
                        rating: document.getElementById('rating').value,
                    });
                    hideLoading();
                    if(data.error){
                       showMessage(data.error)
                    }else{
                        showMessage("review Added Successfully",()=>{
                            rerender(ProductScreen); 
                        });
                    }
                });
        }
        if(document.getElementById('edit-form')){
            
            document
                .getElementById('edit-form')
                .addEventListener('submit',async(e)=>{
                    e.preventDefault();
                    showLoading();
                    console.log(document.getElementById('rating').value);
                    const data = await editReview(request.id,{
                        comment: document.getElementById('comment').value,
                        rating: document.getElementById('rating').value,
                    });
                    console.log(data);
                    hideLoading();
                    if(data.error){
                       showMessage(data.error)
                    }else{
                        isEdit=false;
                        done=true;
                        showMessage("review Updated Successfully",()=>{
                            rerender(ProductScreen); 
                        });
                    }
                })
        }
        const editButtons= document.getElementsByClassName('review-edit-button');
        Array.from(editButtons).forEach((editButton)=>{
            editButton.addEventListener('click',async ()=>{
                
                 isEdit=true;
                 done=false
                 rerender(ProductScreen);
            })
        });

        const deleteButtons= document.getElementsByClassName('review-delete-button');
        Array.from(deleteButtons).forEach((deleteButton)=>{
            deleteButton.addEventListener('click',async ()=>{
                if(confirm('Are you sure to delete the review?')){
                    showLoading()
                    const data= await deleteReview(request.id,deleteButton.id);
                    if(data.error){
                        showMessage(data.error);
                    } else {
                        showMessage("Review Deleted ",()=>{
                            rerender(ProductScreen); 
                        });
                    }
                    hideLoading();
                }
            })
        });
            
    },
    render: async () => {
        const request = parseRequestUrl()
        showLoading();
        const product = await getProduct(request.id);
        // console.log(product);
        if (product.error) {
            return `<div>${product.error}</div>`
        }
        const userInfo =getUserInfo();
        hideLoading();
        let isAuthor;
        if(userInfo){
            product.reviews.map(async (review)=>{
                if(review.user===userInfo._id){
                    isAuthor=review
                }
                
            })
        }

        
        return `
            <div class="content">
                <div class="back-to result">
                    <a href="/#/">Back to result</a>
                </div>
                <div class="details">
                    <div class="details-image">
                    <img src="${product.image}" alt="${product.name}"/>
                    </div>
                    <div class="details-info">
                        <ul>
                            <li>
                                <h1>${product.name}</h1>
                            </li>
                            <li>
                                ${Rating.render({
                                    value: product.rating,
                                    text: `${product.numReviews} reviews`,
                                })}
                            </li>
                            <li>
                                Price: <strong>₹${product.price} </strong>
                            </li>
                            <li>
                                Description:
                                <div>
                                    ${product.description}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="details-action">
                        <ul>
                            <li>
                                Price: ₹${product.price} 
                            </li>
                            <li>
                                Status:
                                    ${ 
                                        product.countInStock >0 
                                        ? `<span class="success">In Stock</span>`
                                        : `<span class="error">Unavailable</span>`
                                    } 
                            </li>
                            <li>
                            <button id="add-button" class="fw primary">Add to Cart</button>
                        </ul>
                    </div>
            </div>
            <div class="content">
                <h2>Reviews</h2>
                <ul class="review">
                    <li>
                        ${userInfo.name
                        ?`
                             ${isAuthor &&!isEdit
                                ?`<li>
                                        <div><b>${isAuthor.name}</b></div>
                                        <div class="rating-container ">
                                            ${Rating.render({
                                                value: isAuthor.rating,
                                            })}
                                            <div>
                                            ${isAuthor.createdAt.substring(0,10)}
                                            </div>
                                        </div>
                                        <div class="new-line">
                                            ${isAuthor.comment}
                                        </div>
                                        <div>
                                            <button id="${isAuthor._id}" class="review-edit-button">
                                                Edit
                                            </button>
                                            <button id="${isAuthor._id}" class="review-delete-button">
                                                Delete
                                            </button>
                                        </div>
                                    </li>`
                                :` `
                                
                              }
                              ${isEdit
                                ?`<div class="form-container" >
                                        <form id="edit-form">
                                            ${Review.render({editreview:isAuthor})}
                                        </form>
                                    </div> 
                                    `
                                :``
                             }
                                    
                            ${
                               !isAuthor  
                                ? `
                                    <div class="form-container" >
                                        <form id="review-form">
                                            ${Review.render({})}
                                        </form>
                                    </div> 
                                    `
                                :``
                            } 
                        `
                        :` <div> Please <a href="/#/signin">Signin</a> to   write a review.
                           </div>`
                        }
                    </li>

                    ${product.reviews
                        .map((review)=>{
                            if(isAuthor!==review)
                               return `
                               <li>
                                    <div><b>${review.name}</b></div>
                                    <div class="rating-container">
                                        ${Rating.render({
                                            value: review.rating,
                                        })}
                                        <div>
                                        ${review.createdAt.substring(0,10)}
                                        </div>
                                    </div>
                                    <div class="new-line">
                                        ${review.comment}
                                    </div>
                                </li>
                                `
                        })
                    .join("\n")}
                    
                </ul> 
             </div>
        </div>
        `;
    },
};
export default ProductScreen;