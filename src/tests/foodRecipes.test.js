import React from 'react';
import { fireEvent, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import context from '../context/RecipesContext';
import renderWithRouter from '../renderWithRouter';
import FoodRecipes from '../pages/FoodRecipes';
import testData from '../testData';
import Provider from '../context/Provider';
import { act } from 'react-dom/test-utils';
import { categoryFood } from '../testDataCategory'


const profileButton = 'profile-top-btn';
const title = 'page-title';
const buttonActiveSearch = 'search-top-btn';
const checkboxIngreedient = 'ingredient-search-radio';
const checkbocName = 'name-search-radio';
const checkboxFirstLetter = 'first-letter-search-radio';
const buttonSearch = 'exec-search-btn';
const searchInput = 'search-input'

const mockFetch = () => {
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
            status: 200,
            ok: true,
            json: () => Promise.resolve(testData),
        }));
};

const mockFetchCategory = () => {
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
            status: 200,
            ok: true,
            json: () => Promise.resolve(categoryFood)
        }))
}

describe('Teste da tela de Comidas', () => {
    beforeAll(mockFetch);
    beforeAll(mockFetchCategory);

    test('Se existe os elementos corretos na tela', async () => {
        
            renderWithRouter(
            <Provider>
                <FoodRecipes />
            </Provider>)
        
        expect(screen.getByTestId(profileButton)).toBeInTheDocument();
        expect(screen.getByTestId(title)).toBeInTheDocument();
        expect(screen.getByTestId(buttonActiveSearch)).toBeInTheDocument();
        expect(screen.getByTestId(checkbocName)).toBeInTheDocument();
        expect(screen.getByTestId(checkboxFirstLetter)).toBeInTheDocument();
        expect(screen.getByTestId(checkboxIngreedient)).toBeInTheDocument();
        expect(screen.getByTestId(buttonSearch)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId(buttonActiveSearch))

        expect(screen.getByTestId(searchInput)).toBeInTheDocument();

        
        
 
    });

    test('Se realiza a requisição para API', async () => {
        await act(async () => {
            renderWithRouter(
                <Provider>
                    <FoodRecipes />
                </Provider>)
        })

        expect(global.fetch).toHaveBeenCalled();
    })
});
