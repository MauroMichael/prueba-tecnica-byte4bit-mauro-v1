import { createAutocomplete } from '@algolia/autocomplete-core';
import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import styles from '../../styles/SearchBar.module.css';


const AutocompleteItem = ({ id, name, image, price }) => {

    return (
        <li>
            {name && <Link href={`/product/${id}`}>
                <div className={styles.item}>
                    <img src={image} alt={name} className={styles.image} />
                    <div>
                        <h3 className={styles.name}>{name.split(' ',2).join(' ')}</h3>
                        <p className={styles.price}>${price}</p>
                    </div>
                </div>
            </Link>}
        </li>
    )
}

export default function Search(props) {
    const [autocompleteState, setAutocompleteState] = useState({
        collections: [],
        isOpen: false
    })

    const autocomplete = useMemo(() => createAutocomplete({
        placeholder: 'Search...',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [{
            sourceId: 'products-ecommerce',
            getItems: ({ query }) => {
                if (query) {
                    return fetch(`/api/products/getProducts?name=${query}`)
                        .then(res => res.json())
                        }
            }
        }],
        ...props
    }), [props])

    const formRef = useRef(null);
    const inputRef = useRef(null);
    const panelRef = useRef(null);

    const formProps = autocomplete.getFormProps({
        inputElement: inputRef.current
    })
    const inputProps = autocomplete.getInputProps({
        inputElement: inputRef.current
    })

    return (
        <form ref={formRef} className={styles.form} {...formProps}>
            <div className={styles.element}>
                <input
                    ref={inputRef}
                    className={styles.autoInput}
                    type='text'
                    {...inputProps} />

                {
                    autocompleteState.isOpen  && (
                        <div className={styles.auto} ref={panelRef} {...autocomplete.getPanelProps()}>
                            {autocompleteState.collections.map((collection, index) => {
                                const { items } = collection

                                return (
                                    <section key={index}>
                                        {items.length > 0 && (
                                            <ul 
                                            className={styles.listItem} {...autocomplete.getListProps()}>
                                                {
                                                    items.map(item => <AutocompleteItem key={item.id}{...item} />)
                                                }
                                            </ul>
                                        )}
                                    </section>
                                )
                            })}
                        </div>
                    )
                }
            </div>
        </form>
    )
}
