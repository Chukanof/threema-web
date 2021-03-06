describe('StringService', function() {

    let $service;

    // Ignoring page reload request
    beforeAll(() => window.onbeforeunload = () => null);

    beforeEach(function() {

        module('3ema.services');

        // Inject the service
        inject(function(StringService) {
            $service = StringService;
        });

    });

    it('parse null string', () => {
        expect($service.getWord(null, 1)).toEqual(jasmine.objectContaining({
            word: null,
            realLength: 0
        }));
    });

    it('parse empty string', () => {
        expect($service.getWord('', 1)).toEqual(jasmine.objectContaining({
            word: null,
            realLength: 0
        }));
    });

    it('parse string (spaces)', () => {
        expect($service.getWord('When the man comes around.', 12)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 3
        }));
        expect($service.getWord('When the man comes around.', 13)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 4
        }));
        expect($service.getWord('When the man        comes around.', 16)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 7
        }));
    });

    it('parse string (newline)', () => {
        expect($service.getWord("When\nthe\nman\ncomes\naround.", 12)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 3
        }));
        expect($service.getWord("When\nthe\nman\ncomes\naround.", 13)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 4
        }));
        expect($service.getWord("When\nthe\nman\n\n\n\n\n\n\n\ncomes\naround.", 16)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 7
        }));
    });

    it('parse string (newline/spaces)', () => {
        expect($service.getWord("When the\nman comes around.", 12)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 3
        }));
        expect($service.getWord("When the\nman \ncomes around.", 13)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 4
        }));
        expect($service.getWord("When the\nman \n \n \n \ncomes around.", 16)).toEqual(jasmine.objectContaining({
            word: 'man',
            realLength: 7
        }));
    });

    it('parse string (special character)', () => {
        expect($service.getWord('When the :man: comes around.', 15)).toEqual(jasmine.objectContaining({
            word: ':man:',
            realLength: 6
        }));
        expect($service.getWord('When the :man: comes around.', 14)).toEqual(jasmine.objectContaining({
            word: ':man:',
            realLength: 5
        }));
    });

    it('parse string (with emoji (2 chars))', () => {
        expect($service.getWord('this 😄 is a :smile: face', 19)).toEqual(jasmine.objectContaining({
            word: ':smile:',
            realLength: 7
        }));
    });

    it('parse string (additional separators)', () => {
        expect($service.getWord('When the spider:man: comes around.', 20, [':'])).toEqual(jasmine.objectContaining({
            word: ':man:',
            realLength: 5
        }));
    });
});
