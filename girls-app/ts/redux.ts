/* Redux toolkit 불러오기 */
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'ref', // slice 식별 이름
    initialState: { imgUrl: '', alTit: ''}, // 초기값
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