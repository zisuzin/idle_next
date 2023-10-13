/* Redux toolkit 불러오기 */
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'ref', // slice 식별 이름
    initialState: { imgSrc: '', alTit: '', audSrc: ''}, // 초기값
    reducers: {
        setImg: (state, action) => {
            state.imgSrc = action.payload;
        },
        setTit: (state, action) => {
            state.alTit = action.payload;
        },
        setAudio: (state, action) => {
            state.audSrc = action.payload;
        }
    }
});

export const { setImg, setTit, setAudio} = imageSlice.actions;
export default imageSlice.reducer;