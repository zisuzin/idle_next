/* Redux toolkit 불러오기 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

/* 액션 생성자 함수에서 비동기 처리 */
export const updateImg = createAsyncThunk('ref/updateImage', async(imgSrc: string) => {
    const response = await fetchSomeData(imgSrc);
    return response;
});

// function fetchSomeData(imgSrc) {
//     return imgSrc;
// }

const imageSlice = createSlice({
    name: 'ref', // slice 식별 이름
    initialState: { // 초기값
        imgSrc: './images/init_bg.png',
        alTit: '재생 곡 없음',
        audSrc: '',
        loading: '',
    }, 
    reducers: {
        setImg: (state, action) => {
            state.imgSrc = action.payload;
        },
        setTit: (state, action) => {
            state.alTit = action.payload;
        },
        setAudio: (state, action) => {
            state.audSrc = action.payload;
        },
    },
    extraReducers: (builder) => {
        // 통신 중
        builder.addCase(updateImg.pending, (state) => {
            state.loading = 'pending';
        });
        // 통신 성공
        builder.addCase(updateImg.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.imgSrc = action.payload;
        });
        // 통신 에러
        builder.addCase(updateImg.rejected, (state) => {
            state.loading = 'failed';
        });
    }
});

export const { setImg, setTit, setAudio } = imageSlice.actions;
export default imageSlice.reducer;