const Review = {
    render: (props)=>{
        const data={
            1:"1 = poor",
            2 :"2 = Fair",
            3 :"3 = Good",
            4 : "4 = Very Good",
            5 : "5 = Excellent",
        }
        return `
            <ul class="form-items">
                
                <li><h3>Write a review</h3></li>
                <li>
                    <label for="rating">Rating</label>
                    <select required name="rating" id="rating" value="${props.editreview ?props.editreview.rating :'5'}" >
                        <option value="${props.editreview ?props.editreview.rating :''}" hidden >${props.editreview ?data[props.editreview.rating]:'Select'}</option>
                        <option value="1">1= poor</option>
                        <option value="2">2 = Fair</option>
                        <option value="3">3 = Good</option>
                        <option value="4">4 = Very Good</option>
                        <option value="5">5 = Excellent</option>
                    </select>
                </li>
                <li>
                    <label for="comment">Comment</label>
                    <textarea required name="comment" id="comment" maxlength="250" minlength="5" >${props.editreview ?props.editreview.comment :''}</textarea>
                </li>
                <li>
                    <button type="submit" class="primary">Submit</button>
                </li>
            </ul>
        `   
    }
    
}

export default Review;
