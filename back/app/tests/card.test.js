class Card {
    constructor(id, category, question, answer, tag) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.tag = tag;
    }
}

describe('Card Service', () => {

    it('Should create a card', async () => {
        const card = new Card("1", "FIRST", "What is the first question?", "This is the first answer", "Testing Tag");
        expect(card).toBeDefined();
    });

    it('Should return the card category', async () => {
        const card = new Card("1", "FIRST", "What is the first question?", "This is the first answer", "Testing Tag");
        expect(card.category).toBe("FIRST");
    });

    it('Should return the card question', async () => {
        const card = new Card("1", "FIRST", "What is the first question?", "This is the first answer", "Testing Tag");
        expect(card.question).toBe("What is the first question?");
    });

    it.todo('Should update the card category when the user successfully answers the question');

    it.todo('Should update the card category to FIRST when the user fails to answer the question');

    it.todo('Should remove the card from the database when the category hits SEVENTH');

})