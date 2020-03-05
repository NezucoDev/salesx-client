import React from 'react'
import InvoiceItem from './InvoiceItem'
import XButton from '../XButton/XButton'

class Invoice extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            items: []
        }
    }

    render() {
        if (this.state.items.length === 0) {
            return this.renderNoItems()
        } else {
            return this.renderItems()
        }
    }

    componentDidMount() {
        document.addEventListener('itemclicked', (e) => {
            const itemIndex = this.state.items.findIndex(item => e.itemData.id === item.id)
            console.log(itemIndex)
            if (itemIndex >= 0) {
                this.setState(({ items }) => ({
                    items: [
                        ...items.slice(0, itemIndex),
                        {
                            ...items[itemIndex],
                            quantity: items[itemIndex].quantity + 1
                        },
                        ...items.slice(itemIndex + 1)
                    ]
                }))
            } else {
                const newItem = e.itemData
                newItem.quantity = 1
                this.setState({ items: [...this.state.items, newItem] })
            }
        })
    }

    renderNoItems() {
        return (
            <div className="invoice">
                No items in invoice. Select any from items list to add to invoice.
            </div>
        )
    }

    renderItems() {
        let total = 0
        const items = this.state.items.map(item => {
            total += (item.price * item.quantity)
            return <InvoiceItem key={item.id} id={item.id} name={item.name} price={item.price} quantity={item.quantity} />
        })

        return (
            <div className="invoice" onClick={this.props.clickHandler}>
                {items}

                <div>
                    <h4>Total: ${total}</h4>
                </div>

                <div className='flex-container'>
                    <XButton text='Print' />
                    <XButton text='Clear' />
                </div>
            </div>
        )
    }
}

export default Invoice
