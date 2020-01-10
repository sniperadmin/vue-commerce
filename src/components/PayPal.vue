<template>
    <div>
        <div ref="paypal"></div>
    </div>
</template>

<script>
    // import image from "../assets/lamp.png"
    export default {
        name: "HelloWorld",
        data: function () {
            return {
                loaded: false,
                paidFor: false,
                product: {
                    price: 777.77,
                    description: "leg lamp from that one movie",
                    img: "./assets/lamp.jpg"
                }
            };
        },
        mounted: function () {
            const script = document.createElement("script");
            script.src =
                "https://www.paypal.com/sdk/js?client-id=AVViIAPlMmbjqtNY_ZubFS8vPk0zK9dIFLCdBEKzvv_l1kgfDGu5zWFMzsR3Ro1bzcxKSRizaxwCr1rG";
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);
        },
        methods: {
            setLoaded: function () {
                this.loaded = true;
                window.paypal
                    .Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: this.product.description,
                                        amount: {
                                            currency_code: "USD",
                                            value: this.product.price
                                        }
                                    }
                                ]
                            });
                        },
                        onApprove: async (data, actions) => {
                            const order = await actions.order.capture();
                            this.data;
                            this.paidFor = true;
                            console.log(order);
                        },
                        onError: err => {
                            console.log(err);
                        }
                    })
                    .render(this.$refs.paypal);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>