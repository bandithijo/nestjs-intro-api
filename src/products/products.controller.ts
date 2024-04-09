import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    return { id: generatedId };
  }

  @Get()
  @HttpCode(200)
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  @HttpCode(200)
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  @HttpCode(202)
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number
  ) {
    return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  }

  @Delete(':id')
  @HttpCode(204)
  removeProduct(@Param('id') prodId: string) {
    return this.productsService.removeProduct(prodId)
  }
}