const productModel = require("../../schemas/product.schema");


class ProductDao {

    async getAll() {
        return productModel.find
    }

    async createProduct(newProd) {
        const createdProduct = new productModel({
            title: newProd.title,
            description: newProd.description,
            price: newProd.price,
            stock: newProd.stock
        });
        return await createdProduct.save();
    };

    async updateProduct(id, newProperties) {
        try {
            const producto = await productModel.findByIdAndUpdate(id, {
                title: newProperties.title,
                description: newProperties.description,
                price: newProperties.price
            }, { new: true });
            return producto;
        } catch (e) {
            throw new Error('something went wrong in UPDATEPRODUCT');
        };
    };

    async deleteProduct(id) {
        try {
            return await productModel.deleteOne({ _id: id });
        } catch (e) {
            throw new Error('error en delete product');
        }
    }

    async decreaseStock(productId, foundProduct, foundCart) {
        let productToCheck = await productModel.findById(productId)
        if (productToCheck.stock > 0) {
            productToCheck.stock -= 1
            productToCheck.save()
            if (foundProduct) {
                foundProduct.quantity += 1;
            } else {
                foundCart.cart.push({ product: productId, quantity: 1 });
            }
            await foundCart.save()
            return foundCart
        }
        return
    }


    /*
    async decreaseStock(id) {
        let productToCheck = await productModel.findById(id)
        if (productToCheck.stock > 0) {
            productToCheck.stock -= 1
            productToCheck.save()
            return productToCheck.stock
        }
    }
    */
    async findById(id) {
        let productToCheck = await productModel.findById(id)
        return productToCheck
    }

}

module.exports = ProductDao