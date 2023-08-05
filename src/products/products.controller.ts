import { Controller, Post, Body, Get, Param, Patch} from "@nestjs/common";
import { ProductsService } from "./products.service";
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService){}
    @Post()
    addProduct(
        @Body('title') prodTitle,
        @Body('description') prodDescription,
        @Body('price') prodPrice,
        ){
            const generatedId = this.productsService.insertProduct(
                prodTitle, 
                prodDescription, 
                prodPrice);
            return {id:generatedId}
    }
    @Get()
    getAllProduct(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string){
        return this.productsService.getSingleProduct(prodId);
    }
    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle,
        @Body('description') prodDescription,
        @Body('price') prodPrice,
    ){
        this.productsService.updateProduct(prodId, prodTitle, prodDescription,prodPrice);
        return null;
    }
     
}