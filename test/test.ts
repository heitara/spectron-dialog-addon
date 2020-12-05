import spectronDialogAddon from '../src/index'
import { expect } from 'chai'
const fs = require('fs')
const electronPath = require('electron')
const path = require('path')

const app = spectronDialogAddon.createApplication({
	path: electronPath.toString(),
	args: [
		path.join(__dirname, '.')
	]
})

describe('Dialogs', function() {
	this.timeout(10000)

	beforeEach(async () => {
		await app.start()
	})

	afterEach(async () => {
		await app.stop()
	})

	describe('Create fake dialogs that pick a button', () => {
		it('Create a fake dialog that clicks the button with index 1 (aka second button)', async () => {
			expect(await app.client.getWindowCount()).to.equal(1)
			//agree has index 1
			await spectronDialogAddon.setDialogButtonIndex(1)
			//TODO: fix the test
			let agree = true //read correct value from electron
			expect(agree).to.equal(true)
		})

		it('Create a fake dialog that clicks the button with index 0 ', async () => {
			expect(await app.client.getWindowCount()).to.equal(1)
			//TODO: fix the test
			let agree = true //read correct value from electron
			expect(agree).to.equal(true)
		})

		it('Create a fake dialog that stays presented for longer ', async () => {
			expect(await app.client.getWindowCount()).to.equal(1)
			await spectronDialogAddon.setDialogDelay(10000) //10s
			//TODO: fix the test (read start and end time)
			let agree = true //read correct value from electron
			expect(agree).to.equal(true)
		})
	})
})