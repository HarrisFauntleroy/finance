/**
 *
 * Stack page
 *
 */
import { Icon } from "@chakra-ui/react"
import {
	Body,
	DirectHitIcon,
	type Feature,
	Features,
	GithubIcon,
	JestIcon,
	NodeJsIcon,
	Page,
	PostgresIcon,
	ReactIcon,
	RedisIcon,
	TypescriptIcon,
} from "ui"
import type { DefaultPage } from "~/pages/_app"

const Stack: DefaultPage = () => {
	const features: Feature[] = [
		{
			heading: "Redis",
			content:
				"Robust in-memory data structure store used as a messaging system and queues",
			icon: <RedisIcon height={8} width={8} />,
		},
		{
			heading: "BullMQ",
			content:
				"Node.js library to implement, manage and interface with Redis queues",
			icon: <Icon as={DirectHitIcon} height={8} width={8} />,
		},
		{
			heading: "GitHub",
			content: "Version control for all repositories",
			icon: <Icon as={GithubIcon} height={8} width={8} />,
		},
		{
			heading: "Typescript",
			content:
				"A programming language by Microsoft which improves on JavaScript",
			icon: <Icon as={TypescriptIcon} height={8} width={8} />,
		},
		{
			heading: "Postgres",
			content:
				"Advanced and enterprise class relational database used to store data",
			icon: <Icon as={PostgresIcon} height={8} width={8} />,
		},
		{
			heading: "Jest",
			content: "Testing framework for React",
			icon: <Icon as={JestIcon} height={8} width={8} />,
		},
		{
			heading: "NodeJs",
			content:
				"JavaScript runtime environment used to power the back-end servers",
			icon: <Icon as={NodeJsIcon} height={8} width={8} />,
		},
		{
			heading: "React",
			content: "JavaScript library by Facebook use to build the front-end",
			icon: <Icon as={ReactIcon} height={8} width={8} />,
		},
	]

	return (
		<Page title="Tech Stack">
			<Body>
				<Features features={features} />
			</Body>
		</Page>
	)
}

Stack.auth = false
export default Stack
