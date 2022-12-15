/**
 *
 * Stack page
 *
 */
import { Icon } from "@chakra-ui/react"
import type { Feature } from "~/components/Cards/Features";
import Features from "~/components/Cards/Features"
import { DirectHit } from "~/components/Icons/DirectHit"
import { Github } from "~/components/Icons/Github"
import { Jest } from "~/components/Icons/Jest"
import { NodeJs } from "~/components/Icons/NodeJs"
import { Postgres } from "~/components/Icons/Postgres"
import { React } from "~/components/Icons/React"
import { Redis } from "~/components/Icons/Redis"
import { Typescript } from "~/components/Icons/Typescript"
import Page from "~/components/Page"
import { Body } from "~/components/Page/Body"
import type { DefaultPage } from "~/pages/_app"

const Stack: DefaultPage = () => {
	const features: Feature[] = [
		{
			heading: "Redis",
			content:
				"Robust in-memory data structure store used as a messaging system and queues",
			icon: <Redis height={8} width={8} />,
		},
		{
			heading: "BullMQ",
			content:
				"Node.js library to implement, manage and interface with Redis queues",
			icon: <Icon as={DirectHit} height={8} width={8} />,
		},
		{
			heading: "GitHub",
			content: "Version control for all repositories",
			icon: <Icon as={Github} height={8} width={8} />,
		},
		{
			heading: "Typescript",
			content:
				"A programming language by Microsoft which improves on JavaScript",
			icon: <Icon as={Typescript} height={8} width={8} />,
		},
		{
			heading: "Postgres",
			content:
				"Advanced and enterprise class relational database used to store data",
			icon: <Icon as={Postgres} height={8} width={8} />,
		},
		{
			heading: "Jest",
			content: "Testing framework for React",
			icon: <Icon as={Jest} height={8} width={8} />,
		},
		{
			heading: "NodeJs",
			content:
				"JavaScript runtime environment used to power the back-end servers",
			icon: <Icon as={NodeJs} height={8} width={8} />,
		},
		{
			heading: "React",
			content: "JavaScript library by Facebook use to build the front-end",
			icon: <Icon as={React} height={8} width={8} />,
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
