import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, desc:string, price:number){
        //const prodID=new Date().toString();
        const prodID=Math.random().toString();
        const newProduct = new Product(prodID,title, desc, price);
        this.products.push(newProduct);
        return prodID;
    }
    getProducts(){
        return [...this.products]; //returning new array
    }
    getSingleProduct(productId:string){
        const product = this.findProduct(productId)[0];
        return {...product};  
    
    }
    updateProduct(
        peodId:string,
        title: string, 
        desc:string, 
        price:number){
            const [product, index] = this.findProduct(peodId);
            const updatedProduct = {...product};
            if(title){
                updatedProduct.title = title;
            }
            if(desc){
                updatedProduct.description = desc;
            }
            if(price){
                updatedProduct.price = price;
            } 
            this.products[index] = updatedProduct;

    }
    deleteProduct(productId:string){
        const [_,index] = this.findProduct(productId);
        this.products.splice(index, 1);
    }
    private findProduct (id: string): [Product, number]{
        const productIndex = this.products.findIndex(prod => prod.Id === id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException("Product not found")
        }
        return [product, productIndex];
    }
}