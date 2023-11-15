export interface Iproduct {
    _id: Number| String,
    name: String,
    price: Number,
    sale?: Number,
    long?: String,
    page?: Number,
    wide?: String,
    heavy?: String,
    description?: String,
    quantity: Number,
    images: any,
    AuthorId?: any
    categoryId: any
}