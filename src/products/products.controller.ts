import { Controller, Post, Body, Get} from "@nestjs/common";
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
     
}