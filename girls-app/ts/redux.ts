/* Redux toolkit 불러오기 */
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'ref',
    initialState: { imgUrl: '', alTit: ''},
    reducers: {
        setImg: (state, action) => {
            state.imgUrl = action.payload;
        },
        setTit: (state, action) => {
            state.alTit = action.payload;
        }
    }
});

export const { setImg, setTit} = imageSlice.actions;
export default imageSlice.reducer;