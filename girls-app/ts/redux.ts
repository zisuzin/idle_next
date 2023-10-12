/* Redux toolkit 불러오기 */
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'image',
    initialState: { imgUrl: ''},
    reducers: {
        setImgUrl: (state, action) => {
            state.imgUrl = action.payload;
        },
    }
});

export const { setImgUrl} = imageSlice.actions;
export default imageSlice.reducer;